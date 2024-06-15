import React, { useEffect, useState } from 'react';
import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';
import { useAppSelector } from '../redux/hook';

interface OptionType {
  value: string;
  label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    minHeight: '30px',
    maxHeight: '40px',
    backgroundColor: state.isSelected ? '#635fc7' : 'white',
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '' : '#F4F7FD',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    minHeight: '30px',
    maxHeight: '40px',
    backgroundColor: 'white',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '150px',
    overflow: 'auto',
  }),
};

interface SelectColOptType {
  setSelOptVal: React.Dispatch<React.SetStateAction<string>>;
  selOptVal: string;
}

const SelectColOpt = ({ setSelOptVal, selOptVal }: SelectColOptType) => {
  const curBoard = useAppSelector(
    (state) => state.curBoardSlice.curBoard.curboard?.board,
  );
  const [isSelected, setIsSelected] = useState<OptionType | null>(null);

  const opt = curBoard?.columns.map((board) => ({
    value: board,
    label: board,
  }));

  const changeSelectValHandler = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    setIsSelected(newValue);
  };

  useEffect(() => {
    if (isSelected) {
      setSelOptVal(isSelected.value);
    } else if (opt && opt.length > 0) {
      setSelOptVal(
        opt.find((option) => option.value === selOptVal)?.value || opt[0].value,
      );
    }
  }, [isSelected, opt, setSelOptVal, selOptVal]);

  return (
    <Select
      styles={customStyles}
      options={opt}
      value={opt?.find((option) => option.value === selOptVal) || opt?.[0]}
      // defaultValue={opt?.[0]}
      // defaultValue={
      //   opt?.find((option) => option.value === selOptVal) || opt?.[0]
      // }
      onChange={changeSelectValHandler}
    />
  );
};

export default SelectColOpt;
