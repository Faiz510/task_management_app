import { useState } from 'react';
import { ActionMeta, SingleValue, StylesConfig } from 'react-select';
import Board from '../data.json';
import Select from 'react-select';

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

const SelectColOpt = () => {
  const [curBoard, setCurBoard] = useState(Board.boards[0]);
  const [isSelected, setIsSelected] = useState<OptionType | null>(null);

  const opt = curBoard.columns.map((board) => ({
    value: board.name,
    label: board.name,
  }));

  const changeSelectValHandler = (
    newValue: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    setIsSelected(newValue);
  };

  return (
    <Select
      styles={customStyles}
      options={opt}
      defaultValue={opt[0] || ''}
      onChange={changeSelectValHandler}
    />
  );
};

export default SelectColOpt;
