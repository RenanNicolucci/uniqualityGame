import { Dispatch, SetStateAction, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export const Modal = ({
  opened,
  setOpen,
  link
}: {
  opened: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  link: string
}) => {
  useEffect(() => {
    if (opened) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [opened]);

  return (
    <div
      className={`z-[1000] fixed bg-[#07070799] top-[0] left-[0] w-full h-[100vh] flex items-center justify-center ${
        opened ? "" : "hidden"
      }`}
    >
      <div className="flex gap-[16px]">
        <iframe
          width="260px"
          height="560px"
          src={link}
          title="litrão"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <button
          className="p-[16px] bg-[blue] text-white h-[54px] rounded"
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoMdClose size={22} />
        </button>
      </div>
    </div>
  );
};
