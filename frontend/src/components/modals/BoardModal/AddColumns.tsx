import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

interface AddColumnsProps {
  defaultCol: string[];
  setDefaultCol: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddColumns: React.FC<AddColumnsProps> = ({
  defaultCol,
  setDefaultCol,
}) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const columnContainerRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newColumn = [...defaultCol];
    newColumn[i] = e.target.value;
    setDefaultCol(newColumn);
  };

  const removeColHandler = (index: number) => {
    const newColumn = defaultCol.filter((_, i) => i !== index);
    setDefaultCol(newColumn);
  };

  useEffect(() => {
    if (columnContainerRef.current)
      setIsOverflow(
        columnContainerRef.current?.scrollHeight >
          columnContainerRef.current?.clientHeight,
      );
  }, [defaultCol]);

  return (
    <div
      ref={columnContainerRef}
      className={`min-h-[100px] max-h-[200px] ${isOverflow ? 'overflow-y-scroll' : 'overflow-hidden'} `}
    >
      {defaultCol.map((col, i) => (
        <div className="flex justify-between items-center px-4 my-2" key={i}>
          <input
            type="text"
            defaultValue={col}
            className="w-full text-base focus:outline-custom-button_bg/60 focus:outline-1 p-1"
            placeholder="new column"
            onChange={(e) => handleOnChange(e, i)}
            id={col}
          />
          <span
            className="text-custom-secondary_text text-2xl cursor-pointer"
            onClick={() => removeColHandler(i)}
          >
            <FaXmark />
          </span>
        </div>
      ))}
    </div>
  );
};

export default AddColumns;
