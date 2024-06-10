import React, { ChangeEvent, FormEvent, useState } from 'react';
import OverlayModal from '../OverlayModal';
import { AuthReqApiHandler } from './AuthReqHandler';

interface RegisterProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  showRegModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSignModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({
  onClose,
  showRegModal,
  showSignModal,
}) => {
  const [inputValues, setInputValues] = useState<RegisterUserType>({
    username: '',
    email: '',
    password: '',
    conformPassword: '',
  });
  const [regError, setRegError] = useState(null);

  const changeInputValHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues({ ...inputValues, [id]: value });
  };

  const submitRegisterFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await AuthReqApiHandler('auth/register', inputValues); // Await the API request
      if (res) {
        onClose(false);
        showRegModal(false);
        showSignModal(true);
      }
    } catch (error: any) {
      setRegError(error);
    }
  };

  const showSigninHandler = () => {
    onClose(true);
    showRegModal(false);
    showSignModal(true);
  };

  return (
    <OverlayModal onClose={onClose}>
      <h3 className="text-custom-dark_secondary_bg dark:text-custom-primary_bg text-lg font-medium my-2">
        Register
      </h3>

      <form onSubmit={submitRegisterFormHandler}>
        <div className="flex flex-col my-4">
          <label
            htmlFor="username"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            username
          </label>
          <input
            type="text"
            placeholder="username"
            id="username"
            className="w-full focus:outline-custom-button_bg/60 text-base p-1 font-light mx-auto dark:text-custom-primary_bg dark:bg-custom-dark_secondary_bg focus-within:outline-none"
            onChange={changeInputValHandler}
          />
        </div>

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

        <div className="flex flex-col my-4">
          <label
            htmlFor="confirmPassword"
            className="text-sm text-custom-secondary_text font-semibold"
          >
            confirm password
          </label>
          <input
            type="password"
            placeholder="confirm password"
            id="confirmPassword"
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
            If already have account ?
            <span
              className="text-custom-button_bg font-medium cursor-pointer px-2"
              onClick={showSigninHandler}
            >
              Sign in
            </span>
          </span>
        </div>

        {regError && <div className="text-red-500 my-4">{regError}</div>}
      </form>
    </OverlayModal>
  );
};

export default Register;
