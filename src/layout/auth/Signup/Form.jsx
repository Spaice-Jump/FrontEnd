import { useEffect, useState } from "react";
import Input from "./Input";
import { isButtonDisabled } from "./formUtils";
import Loading from "../../utils/spinner/Loading";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp, resetErrors } from "../../../redux/actions";
import { getUi } from "../../../redux/selectors";

const Form = () => {
  let { isLoading, error } = useSelector(getUi);

  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(isButtonDisabled(user, email, password, passwordConfirm));
  }, [user, email, password, passwordConfirm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      user,
      email,
      password,
      passwordConfirm,
    };

    await dispatch(authSignUp(data));
  };

  const resetError = () => {
    dispatch(resetErrors());
  };

  return (
    <form onSubmit={handleSubmit} className="space-form">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Input
            tiLabel="Name User"
            type="text"
            name="user"
            id="user"
            handleInput={(e) => setUser(e.target.value)}
          />

          <Input
            tiLabel="Email"
            type="email"
            name="email"
            id="email"
            handleInput={(e) => setEmail(e.target.value)}
          />

          <Input
            tiLabel="Password"
            type="password"
            name="password"
            id="password"
            handleInput={(e) => setPassword(e.target.value)}
          />

          <Input
            tiLabel="Password Confirm"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            handleInput={(e) => setPasswordConfirm(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={buttonDisabled}
            data-testid="signUpButton"
          >
            Sign Up
          </button>
        </>
      )}
      {!error ? (
        <br />
      ) : (
        <div className="error" onClick={resetError}>
          <p data-testid="error"> {error}</p>
        </div>
      )}
    </form>
  );
};

export default Form;
