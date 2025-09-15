import type { SetStateAction } from "react";

function CustomDeleteModal({
  modal,
  setModal,
  onSubmit,
}: {
  modal: boolean;
  onSubmit: () => void;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  if (!modal) return null;

  return (
    <section className="relative">
      {/* overlay */}
      <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/30 z-20" />
      {/* content */}
      <div className="bg-white z-30 fixed inset-0 w-full  h-fit max-w-sm m-auto p-5 rounded-lg">
        <div className="flex justify-end mb-5">
          {/* <h6 className="font-bold text-lg">حذف</h6> */}

          <button onClick={() => setModal(false)} className="size-5">
            <img src="/close-icon.svg" alt="icon" />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-bold">آیا میخواهید این محتوا حذف شود؟</p>
          <div className="flex items-center justify-between">
            <button
              className="btn bg-gray-400 text-black hover:text-white px-4 py-2 rounded-lg"
              onClick={() => setModal(false)}
            >
              خیر
            </button>
            <button onClick={onSubmit} className="btn btn-success hover:text-white">
              بله
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomDeleteModal;
