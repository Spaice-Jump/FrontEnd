import { useEffect, useState } from 'react';
import { signUp } from '../../../api/auth';
import Input from './Input';
import { createNewUser, isButtonDisabled, isPasswordEqual } from './formUtils';
import { Error } from './Error';

const Form = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setButtonDisabled(isButtonDisabled(user, email, password, passwordConfirm));
  }, [user, email, password, passwordConfirm]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (password === passwordConfirm) {
      setError('');
      const data = {
        user,
        email,
        password,
      };

      try {
        const newUser = await signUp(data, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        setError(newUser?.message);
      } catch (error) {
        setError(error?.message);
      }
    } else {
      setError('password confirmation does not match');
    }
  };

  const resetError = () => {
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
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
      {!error ? (
        <br />
      ) : (
        <div
          className="error"
          onClick={resetError}
        >
          <p data-testid="error"> {error}</p>
        </div>
        // <Error error={error}/>
      )}
    </form>
  );
};

export default Form;
