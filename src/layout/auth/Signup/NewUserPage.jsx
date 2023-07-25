import { useEffect, useState } from 'react';
import './newUserPage.css';

function NewUserPage() {
  const [user, setUSer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (
      !!user?.length &&
      !!email?.length &&
      !!password?.length &&
      !!passwordConfirm?.length
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, email, password, passwordConfirm]);

  const handleSubmit = event => {
    event.preventDefault();
    password !== passwordConfirm
      ? setError('password confirmation does not match')
      : setError('');

    const newUser = {};
  };

  const handleUserChange = event => {
    setUSer(event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = event => {
    setPasswordConfirm(event.target.value);
  };

  const resetError = () => {
    setError('');
  };

  return (
    <section
      id="neu-user"
      className="masthead"
    >
      <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase">New Space Traveler</h1>
          <form onSubmit={handleSubmit}>
            <p className="text-white-50 mx-auto mt-2 mb-5">
              <label>
                Name User
                <br />
                <input
                  type="text"
                  name="user"
                  id="user"
                  required
                  onChange={handleUserChange}
                />
              </label>
            </p>
            <p className="text-white-50 mx-auto mt-2 mb-5">
              <label>
                Email
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={handleEmailChange}
                />
              </label>
            </p>
            <p className="text-white-50 mx-auto mt-2 mb-5">
              <label>
                Password
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={handlePasswordChange}
                />
              </label>
            </p>
            <p className="text-white-50 mx-auto mt-2 mb-5">
              <label>
                Password Confirm
                <br />
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  required
                  onChange={handlePasswordConfirmChange}
                />
              </label>
            </p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={buttonDisabled}
              data-testid="signInButton"
            >
              Sign in
            </button>

            {!error ? (
              <br />
            ) : (
              <div
                className="error"
                onClick={resetError}
              >
                {' '}
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewUserPage;
