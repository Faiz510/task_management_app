import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import OverlayModal from '../OverlayModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { signinHandler } from '../../../redux/Slice/SigninSlice';

interface SigninProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  showRegModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSignModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signin: React.FC<SigninProps> = ({
  onClose,
  showRegModal,
  showSignModal,
}) => {
  const [inputValues, setInputValues] = useState<SigninUserType>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const userError = useAppSelector((state) => state.user.error);

  const changeInputValHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setInputValues({ ...inputValues, [id]: value });
  };

  const submitRegisterFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signinHandler(inputValues));

    if (!userError) {
      onClose(false);
      showRegModal(false);
      showSignModal(false);
    }
  };

  const createAccountHandler = () => {
    onClose(false);
    showRegModal(true);
    showSignModal(false);
  };

  return (
    <OverlayModal onClose={onClose}>
      <h3 className="text-custom-dark_secondary_bg dark:text-custom-primary_bg text-lg font-medium my-2">
        Sign in
      </h3>

      <form onSubmit={submitRegisterFormHandler}>
        <div className="flex flex-col my-4">
          <label
            htmlFor="email"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            email
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            onChange={changeInputValHandler}
          />
        </div>

        <div className="flex flex-col my-4">
          <label
            htmlFor="password"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            password
          </label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            onChange={changeInputValHandler}
          />
        </div>

        <button
          type="submit"
          className="w-full my-2 mb-4 py-1 bg-custom-button_bg rounded-full text-custom-secondary_bg font-medium"
        >
          Add Board
        </button>

        <div className="my-4">
          <span>
            if don't have Account then ?
            <span
              className="text-custom-button_bg font-medium cursor-pointer px-2"
              onClick={createAccountHandler}
            >
              Create one
            </span>
          </span>
        </div>

        {userError && <div className="text-red-500 my-4">{userError}</div>}
      </form>
    </OverlayModal>
  );
};

export default Signin;
