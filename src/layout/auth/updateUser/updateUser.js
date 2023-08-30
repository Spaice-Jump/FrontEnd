import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetErrors } from '../../../redux/actions';
import { getUi, getUserId } from '../../../redux/selectors';
import Loading from '../../utils/spinner/Loading';
import Input from '../Signup/Input';
import { isButtonDisabled } from '../Signup/formUtils';

function UpdateUser() {
  let { isLoading, error } = useSelector(getUi);
  const dataa = useSelector(getUserId);
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const resetError = () => {
    dispatch(resetErrors());
  };

  useEffect(() => {
    setButtonDisabled(isButtonDisabled(user, email, password, passwordConfirm));
  }, [user, email, password, passwordConfirm]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      user,
      email,
      password,
      passwordConfirm,
    };
    console.log(data);
    //await dispatch(authUpdateUser(data));
  };

  return (
    <section
      id="neu-user"
      className="masthead"
    >
      <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase">Update User</h1>
          <form onSubmit={handleSubmit}>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Input
                  value={dataa}
                  tiLabel="Name User"
                  type="text"
                  name="user"
                  id="user"
                  handleInput={e => setUser(e.target.value)}
                />

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
          )
        </div>
      </div>
    </section>
  );
}

export default UpdateUser;
