import type { ReactNode, SetStateAction } from "react";

function CustomModal({
  modal,
  setModal,
  title,
  containerClass,
  children,
}: {
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  containerClass?: string;
  children: ReactNode;
}) {
  if (!modal) return null;

  return (
    <section className="relative">
      {/* overlay */}
      <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/70 z-20 px-5 flex items-center justify-center">
        {/* content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white  z-30 max-h-[80vh] md:max-h-none overflow-y-auto inset-0 w-full ${containerClass}  h-fit max-w-xl m-auto  p-5 rounded-lg`}
        >
          <div className="flex justify-between mb-5">
            <h6 className="font-bold text-lg">{title}</h6>

            <button onClick={() => setModal(false)} className="size-5">
              <img src="/close-icon.svg" alt="icon" />
            </button>
          </div>
          {children}
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default CustomModal;
