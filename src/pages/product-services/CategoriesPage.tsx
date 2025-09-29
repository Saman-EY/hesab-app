import { useEffect, useState } from "react";
import { useGetCategoriesQry } from "../../hooks/queries";
import { noSpaces } from "../../tools";
import { useCreateCat, useCreateSubCat, useDeleteCat, useDeleteSubCat } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";

function CategoriesPage() {
    const [catValue, setCatValue] = useState("");
    const { mutate: createCat } = useCreateCat();
    const queryClient = useQueryClient();

    return (
        <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
            <section className="w-full max-w-md mx-auto flex flex-col gap-5">
                <div className={`w-full mx-auto flex flex-col`}>
                    <span className="text-sm mb-2 text-gray-700">اضافه کردن دسته بندی اصلی</span>
                    <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
                        <input
                            value={catValue}
                            onInput={noSpaces}
                            onChange={(e) => setCatValue(e.target.value)}
                            type={"text"} // force text if formatting
                        />
                    </label>
                </div>

                <button
                    // disabled={isPending}
                    onClick={() => {
                        const body = {
                            title: catValue,
                        };

                        createCat(body, {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ["categories-list"] });
                            },
                        });

                        setCatValue("");
                    }}
                    className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
                >
                    ثبت
                </button>
            </section>

            <section className="w-full max-w-md mx-auto flex flex-col gap-2 mt-10">
                <h6>لیست دسته بدی ها</h6>
                <CategoriesList />
            </section>
        </section>
    );
}

export default CategoriesPage;

const CategoriesList = () => {
    const queryClient = useQueryClient();
    const { data: mainCats } = useGetCategoriesQry();
    const { mutate: createSubCat } = useCreateSubCat();
    const { mutate: deleteCat } = useDeleteCat();
    const { mutate: deleteSubCat } = useDeleteSubCat();
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState("");
    const [currentParent, setCurrentParent] = useState("");

    const List = mainCats?.categories;

    const handleAddCat = (item) => {
        setCurrentParent(item._id);
        setModal(true);
    };
    const handleDeleteCat = (item) => {
        deleteCat(item._id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["categories-list"] });
            },
        });
    };
    const handleDeleteSubCat = (item) => {
        deleteSubCat(item._id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["categories-list"] });
            },
        });
    };

    useEffect(() => {
        if (!modal) {
            setCurrentParent("");
            setValue("");
        }
    }, [modal]);

    return (
        <section className="border border-gray-300 flex flex-col gap-5 rounded-lg min-h-20 p-5">
            {List?.map((item, idx) => (
                <div className="flex flex-col gap-3" key={idx}>
                    <div className="flex justify-between items-center gap-2">
                        <span className="text-gray-800 font-bold">{item.title}</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => handleAddCat(item)} className="text-white bg-green-500 rounded-xs">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                            <button onClick={() => handleDeleteCat(item)} className="text-white bg-red-500 rounded-xs ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {item.subcategories.map((sub, subIdx) => (
                            <span key={subIdx} className="text-gray-600 mr-4 flex justify-between">
                                _{sub.title}
                                <button
                                    onClick={() => handleDeleteSubCat(sub)}
                                    className="text-white bg-red-400 rounded-xs"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            <CustomModal title="اضافه کردن زیردسته" modal={modal} setModal={setModal}>
                <section className="flex flex-col gap-4">
                    <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
                        <input
                            value={value}
                            onInput={noSpaces}
                            onChange={(e) => setValue(e.target.value)}
                            type={"text"} // force text if formatting
                        />
                    </label>
                    <button
                        // disabled={isPending}
                        onClick={() => {
                            const body = {
                                title: value,
                                parent: currentParent,
                            };

                            createSubCat(body, {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["categories-list"] });
                                    setModal(false);
                                },
                            });
                        }}
                        className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
                    >
                        ثبت
                    </button>
                </section>
            </CustomModal>
        </section>
    );
};

// [
//     {
//         "_id": "68da87deba7c3bbd17140b28",
//         "title": "ICICICHild",
//         "parent": "68da87beba7c3bbd17140b21",
//         "subcategories": [],
//         "__v": 0
//     },
//     {
//         "_id": "68da87e2ba7c3bbd17140b2c",
//         "title": "ICICICHild2",
//         "parent": "68da87beba7c3bbd17140b21",
//         "subcategories": [],
//         "__v": 0
//     }
// ]
