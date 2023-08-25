import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUi, getUserId } from '../../../redux/selectors';
import Loading from '../../utils/spinner/Loading';
import Input from '../Signup/Input';
import { isButtonDisabled } from '../Signup/formUtils';
import { authDeleteUser, resetErrors } from '../../../redux/actions';
import { logout } from '../../../api/serviceAuth'

function FormDeleteUser({ userId }) {
  let { isLoading, error } = useSelector(getUi);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(
      isButtonDisabled('user', email, password, passwordConfirm)
    );
  }, [email, password, passwordConfirm]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      userId,
      email,
      password,
      passwordConfirm,
    };

    await dispatch(authDeleteUser(data));


    
  };

  const resetError = () => {
    dispatch(resetErrors());
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Input
            tiLabel="Email"
            type="email"
            name="email"
            id="email"
            handleInput={e => setEmail(e.target.value)}
          />

          <Input
            tiLabel="Password"
            type="password"
            name="password"
            id="password"
            handleInput={e => setPassword(e.target.value)}
          />

          <Input
            tiLabel="Password Confirm"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            handleInput={e => setPasswordConfirm(e.target.value)}
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
        <div
          className="error"
          onClick={resetError}
        >
          <p data-testid="error"> {error}</p>
        </div>
      )}
    </form>
  );
}

export default FormDeleteUser;
