import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import TxtInput from "../../components/TxtInput";
import { useFormik } from "formik";
import { useCreateProject, useDeleteProject, useUpdateProject } from "../../hooks/mutation";
import * as Yup from "yup";
import { useGetAllProjectsQry } from "../../hooks/queries";
import type { IProject } from "../../allTypes";
import CustomModal from "../../components/CustomModal";
import CustomDeleteModal from "../../components/CustomDeleteModal";

function AllProjects() {
  const { mutate, isPending } = useCreateProject();
  const { data: projects } = useGetAllProjectsQry();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("الزامی است"),
    }),
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["projects-list"] });
        },
      });
      resetForm();
    },
  });

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className="flex flex-col gap-4 mb-6 mt-5 w-full max-w-[500px] mx-auto ">
        <TxtInput formik={formik} name="title" label="نام پروژه" />

        <button
          disabled={isPending}
          onClick={() => formik.handleSubmit()}
          className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
        >
          ثبت
        </button>
      </section>

      <h6 className="w-full max-w-xl mx-auto mb-5 text-center text-lg">لیست پروژه ها</h6>
      <div className="overflow-x-auto w-full max-w-md mx-auto border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th></th>
              <th>نام</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((item: IProject, idx: number) => (
              <Row idx={idx} item={item} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllProjects;

const Row = ({ item, idx }: { item: IProject; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate, isPending } = useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: item?.title || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("الزامی است"),
    }),
    onSubmit: (values, { resetForm }) => {
      mutate(
        { id: item._id, body: values },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects-list"] });
            setEditModal(false);
          },
        }
      );
      resetForm();
    },
  });

  return (
    <>
      <tr className="odd:bg-gray-100 " key={idx}>
        <th>{idx + 1}</th>
        <td>{item?.title}</td>

        <td className="flex flex-wrap gap-2 justify-center md:justify-end">
          <button
            onClick={() => setEditModal(true)}
            className="size-8 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200"
          >
            <img src="/edit-icon.png" alt="ویرایش" className="size-5" />
          </button>

          <button
            onClick={() => setDeleteModal(true)}
            className="size-8 flex items-center justify-center rounded bg-red-100 hover:bg-red-200"
          >
            <img src="/trash-icon.png" alt="حذف" className="size-5" />
          </button>
        </td>
      </tr>

      <CustomModal containerClass="!max-w-6xl" title="ویرایش" modal={editModal} setModal={setEditModal}>
        <section className="flex flex-col gap-4 mb-6 mt-5 w-full max-w-[500px] mx-auto ">
          <TxtInput formik={formik} name="title" label="نام پروژه" />

          <button
            disabled={isPending}
            onClick={() => formik.handleSubmit()}
            className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
          >
            ثبت
          </button>
        </section>
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteProject(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["projects-list"] });
              setDeleteModal(false);
            },
          })
        }
        modal={deleteModal}
        setModal={setDeleteModal}
      />
    </>
  );
};
