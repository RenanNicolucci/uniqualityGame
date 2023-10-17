import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

export const Modal = ({
  opened,
  setOpen,
  link,
}: {
  opened: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  link: string;
}) => {
  useEffect(() => {
    if (opened) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  }, [opened]);

  return (
    <div
      className={`fixed left-[0] top-[0] z-[1000] flex h-[100vh] w-full items-center justify-center bg-[#07070799] ${
        opened ? '' : 'hidden'
      }`}
    >
      <div className="flex gap-[16px]">
        <iframe
          width="260px"
          height="560px"
          src={link}
          title="litrão"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        <button
          type="button"
          className="h-[54px] rounded bg-[blue] p-[16px] text-white"
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
