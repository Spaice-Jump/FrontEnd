import { useEffect, useState } from 'react';
import { login } from '../../../api/serviceLogin';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    await login(credential,checked)}
    

  //const handleEmailChange = event => {
    //setEmail(event.target.value);
  //};
  //const handlePasswordChange = event => {
    //setPassword(event.target.value);
  //};

  const resetError = () => {
    setError('');
  };
  const [credential, setCredential] = useState({
    email: '',
    password: '',
  });
  const handleChange = event => {
    if (event.target.name === 'email') {
      setCredential({ ...credential, email: event.target.value }); //con esto vemos si escribe en los imput o no
    }
    if (event.target.name === 'password') {
      setCredential({ ...credential, password: event.target.value });
    }
  };

  const disableButton = !credential.email || !credential.password;
  const [checked, setCheked] = useState(false);
  const handleChecked = event => {
    setCheked(event.target.checked);
    
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
            {/* <Input
                  tiLabel="Name User"
                  type="text"
                  name="user"
                  id="user"
                  onChange={handleUserChange}
                />
    
                <Input
                  tiLabel="Email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleEmailChange}
                />
                <Input
                  tiLabel="Password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
                <Input
                  tiLabel="Password Confirm"
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={handlePasswordConfirmChange}
                /> */}

            <p className="text-white-50 mx-auto mt-2 mb-5">
              <label>
                Email
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  data-testid="email"
                  placeholder="Write your Email "
                  required
                  onChange={handleChange}
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
                  placeholder="Write your Password"
                  data-testid="password"
                  required
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disableButton}
              data-testid="signUpButton"
            >
              Login
            </button>
            </p>
            <p>
            <input
              className="form-check-input"
              type="checkbox"
              checked={checked}
              onChange={handleChecked}
            />
            <span className='span-check'>Marca para guardar credenciales</span>
            </p>

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
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
