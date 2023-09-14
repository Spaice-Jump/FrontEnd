import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../../api/serviceAuth";
import { authlogin, resetErrors } from "../../../redux/actions";
import { useTranslation } from "react-i18next";
import { getIsLogged, getUi } from "../../../redux/selectors";
import Loading from "../../utils/spinner/Loading";
import Layout from "../../Layout";
function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let { isLoading, error } = useSelector(getUi);
  const estado = useSelector(getIsLogged);
  //const [error, setError] = useState('');
  //const [loading, setLoading] = useState(false)
  //const [isLogin, setIsLogin] = useState(false)
  //const navigate = useNavigate()
  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   try {
  //     setLoading(true)
  //     await login(credential,checked)
  //     setLoading(false)
  //     navigate('/')

  //   } catch (error) {
  //     setError(error)

  //   }

  //   }
  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(authlogin(credential, checked));
    //redirect to pathname
    // const to = location.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
    // navigate(to); //con las interrogaciones es por si viene esos estados vacios para que no de error pues si vienen vacio vas a /
  };

  const resetError = () => {
    dispatch(resetErrors());
  };
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    if (event.target.name === "email") {
      setCredential({ ...credential, email: event.target.value }); //con esto vemos si escribe en los imput o no
    }
    if (event.target.name === "password") {
      setCredential({ ...credential, password: event.target.value });
    }
  };

  const disableButton = !credential.email || !credential.password;
  const [checked, setCheked] = useState(false);
  const handleChecked = (event) => {
    setCheked(event.target.checked);
  };

  return (
    <Layout>
    <section id="neu-user" className="masthead login-form-page">
      <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="mx-auto my-0 text-uppercase new-space-traveler-title">
          {t("login-page.welcome-traveler-title")}
          </h1>
          {isLoading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit} className="space-login-form">
              <p className="text-white-50 mx-auto mt-2 mb-5">
                <label>
                {t("login-page.email-label")}
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
                {t("login-page.password-label")}
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
                <span className="span-check">
                  Marca para guardar credenciales
                </span>
              </p>
              <p className="text-white forget-password">
                ¿Has olvidado la contraseña?
                <br />
                <a href="/password" class="link-info">
                  <span className="remember-password">Recordar Contraseña</span>
                </a>
              </p>

              {!error ? (
                <br />
              ) : (
                <div className="error" onClick={resetError}>
                  <p data-testid="error"> {error}</p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
    </Layout>
  );
}

export default LoginPage;
