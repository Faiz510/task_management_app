import React, { useEffect, useRef } from 'react';

interface BoardOptType {
  showBoardOpt: boolean;
  setShowBoardOpt: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDelBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
  dotRef: React.RefObject<HTMLDivElement>;
}

const BoardOpt: React.FC<BoardOptType> = ({
  showBoardOpt,
  setShowBoardOpt,
  dotRef,
  setShowEditBoardModal,
  setShowDelBoardModal,
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
        setShowBoardOpt(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showBoardOpt, dotRef]);

  return (
    <>
      {showBoardOpt && (
        <div
          ref={boardRefOpt}
          className="absolute right-10 top-20 flex flex-col justify-center items-center bg-custom-primary_bg px-10 py-2 cursor-pointer rounded-lg text-sm"
        >
          <span
            className="cursor-pointer my-1 text-custom-secondary_text"
            onClick={() => setShowEditBoardModal(true)}
          >
            Edit Board
          </span>
          <span
            className="cursor-pointer my-1 text-red-600"
            onClick={() => setShowDelBoardModal(true)}
          >
            Delete
          </span>
        </div>
      )}
    </>
  );
};

export default BoardOpt;
