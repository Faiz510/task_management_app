import React, { useEffect, useRef } from 'react';

interface BoardOptType {
  showOpt: boolean;
  setShowOpt: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDelModal: React.Dispatch<React.SetStateAction<boolean>>;
  dotRef: React.RefObject<HTMLDivElement>;
  modalFor: 'Task' | 'Board';
}

const ModalOpt: React.FC<BoardOptType> = ({
  showOpt,
  setShowOpt,
  dotRef,
  setShowEditModal,
  setShowDelModal,
  modalFor,
}) => {
  const boardRefOpt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        boardRefOpt.current &&
        !boardRefOpt.current.contains(event.target as Node) &&
        dotRef.current &&
        !dotRef.current.contains(event.target as Node)
      )
        setShowOpt(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOpt, dotRef]);

  const onEditHandler = () => {
    setShowEditModal(true);
    setShowOpt(false);
  };

  const onDelHandler = () => {
    setShowDelModal(true);
    setShowOpt(false);
  };

  return (
    <>
      {showOpt && (
        <div
          ref={boardRefOpt}
          className={`absolute ${modalFor === 'Task' ? ' right-0 top-10' : ' right-5 top-20'} flex flex-col justify-center items-center bg-custom-primary_bg dark:bg-custom-dark_secondary_bg px-10 py-2 cursor-pointer rounded-lg text-sm`}
        >
          <span
            className="cursor-pointer my-1 text-custom-secondary_text w-full"
            onClick={onEditHandler}
            // onClick={() => setShowEditModal(true)}
          >
            Edit {modalFor}
          </span>
          <span
            className="cursor-pointer my-1 text-red-600 w-full"
            onClick={onDelHandler}
            // onClick={() => setShowDelModal(true)}
          >
            Delete
          </span>
        </div>
      )}
    </>
  );
};

export default ModalOpt;
