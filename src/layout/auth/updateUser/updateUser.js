import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUpdateUser, resetErrors } from '../../../redux/actions';
import {
  getEmail,
  getIsLogged,
  getUi,
  getUserId,
  getUserName,
} from '../../../redux/selectors';
import Loading from '../../utils/spinner/Loading';
import Layout from '../../Layout';
import Input from '../Signup/Input';
import { isButtonDisabled } from '../Signup/formUtils';
import { getNewPassword, updateUser } from '../../../api/serviceAuth';



function UpdateUser() {
  let { isLoading, error } = useSelector(getUi);
  const userEmail = useSelector(getEmail);
  const userName = useSelector(getUserName);
  const dataa = useSelector(getUserId);
  const dispatch = useDispatch();
  const [user, setUser] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
 

  const resetError = () => {
    dispatch(resetErrors());
  };

  //setButtonDisabled(isButtonDisabled(user, email, password, passwordConfirm));
  const credential = {
    user,
    email,
    password,
    passwordConfirm,
  };

  const handleSubmit = async event => {
    event.preventDefault();
        
      console.log(credential);
      
      await dispatch(authUpdateUser(credential)) 
      
    //await dispatch(authUpdateUser(data));
  };
  const disableButton = !credential.passwordConfirm && !credential.password && !credential.user;
  console.log('prueba', !credential.user)

  return (
    <Layout>
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
                    placeholder={userName}
                    tiLabel="Name User"
                    type="text"
                    name="user"
                    id="user"
                    required={false}
                    handleInput={e => setUser(e.target.value)}
                  />

                  <Input
                    placeholder={userEmail}
                    tiLabel="Email"
                    type="email"
                    name="email"
                    id="email"
                    required={false}
                    handleInput={e => setEmail(e.target.value)}
                    readOnly={true}
                    
                  />

                  <Input
                    tiLabel="Password"
                    type="password"
                    name="password"
                    id="password"
                    required={false}
                    handleInput={e => setPassword(e.target.value)}
                  />

                  <Input
                    tiLabel="Password Confirm"
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    required={false}
                    handleInput={e => setPasswordConfirm(e.target.value)}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-testid="signUpButton"
                    disabled={disableButton}
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
    </Layout>
  );
}

//   const dispatch = useDispatch();
//   const userEmail = useSelector(getEmail);
//   const userName = useSelector(getUserName)
//   let { isLoading, error } = useSelector(getUi);
//   const estado = useSelector(getIsLogged);
//   //const estado = useSelector(getIsLogged);
//   //const [error, setError] = useState('');
//   //const [loading, setLoading] = useState(false)
//   //const [isLogin, setIsLogin] = useState(false)
//   //const navigate = useNavigate()
//   // const handleSubmit = async event => {
//   //   event.preventDefault();
//   //   try {
//   //     setLoading(true)
//   //     await login(credential,checked)
//   //     setLoading(false)
//   //     navigate('/')

//   //   } catch (error) {
//   //     setError(error)

//   //   }

//   //   }
//   const handleSubmit = async event => {
//     event.preventDefault();
//     if (credential.password === credential.passwordConfirm) {
//                console.log(credential);
//                console.log('log',credential.password === credential.passwordConfirm)
//                await updateUser(credential)
//              } else {
//                console.log('no coincide');
//              }
//              //await dispatch(authUpdateUser(data));
//            };
//     //await dispatch(authlogin(credential, checked));
//     //redirect to pathname
//     // const to = location.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
//     // navigate(to); //con las interrogaciones es por si viene esos estados vacios para que no de error pues si vienen vacio vas a /
  

//   const resetError = () => {
//     dispatch(resetErrors());
//   };
  
//   const [credential, setCredential] = useState({
//     user: userName,  
//     email: userEmail,
//     password: '',
//     passwordConfirm:""
//   });

//   useEffect(()=>{

//   }
//       )
//       const handleChange = event => {
//         if (event.target.name === 'user') {
//             setCredential({ ...credential, user: event.target.value }); //con esto vemos si escribe en los imput o no
//           }  
//         if (event.target.name === 'email') {
//           setCredential({ ...credential, email: event.target.value }); //con esto vemos si escribe en los imput o no
//         }
//         if (event.target.name === 'password') {
//           setCredential({ ...credential, password: event.target.value });
//         }
//         if (event.target.name === 'passwordConfirm') {
//             setCredential({ ...credential, passwordConfirm: event.target.value }); //con esto vemos si escribe en los imput o no
//           }
//         }

  

//   //const disableButton = !credential.email || !credential.password;
//   //const [checked, setCheked] = useState(false);
//   //const handleChecked = event => {
//     //setCheked(event.target.checked);
//   //};

//   return (
//     <section
//       id="neu-user"
//       className="masthead"
//     >
//       <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
//         <div className="text-center">
//           <h1 className="mx-auto my-0 text-uppercase">Login User</h1>
//           {isLoading ? (
//             <Loading />
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <p className="text-white-50 mx-auto mt-2 mb-5">
//                 <label>
//                   User
//                   <br />
//                   <input
//                     type="text"
//                     name="user"
//                     id="user"
//                     data-testid="user"
//                     placeholder="Write your User Name "
//                     //required
//                     onChange={handleChange}
//                   />
//                 </label>
//               </p>  
//               <p className="text-white-50 mx-auto mt-2 mb-5">
//                 <label>
//                   Email
//                   <br />
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     data-testid="email"
//                     placeholder="Write your Email "
//                     value={userEmail}
//                     readonly
//                     //required
//                     onChange={handleChange}
//                   />
//                 </label>
//               </p>
//               <p className="text-white-50 mx-auto mt-2 mb-5">
//                 <label>
//                   Password
//                   <br />
//                   <input
//                     type="password"
//                     name="password"
//                     id="password"
//                     placeholder="Write your Password"
//                     //value='pepe'
//                     data-testid="password"
//                     //required
//                     onChange={handleChange}
//                   />
//                 </label>
//               </p>
//               <p className="text-white-50 mx-auto mt-2 mb-5">
//                 <label>
//                 passwordConfirm
//                   <br />
//                   <input
//                     type="password"
//                     name="passwordConfirm"
//                     id="passwordConfirm"
//                     placeholder="Write your Password"
//                     data-testid="passwordConfirm"
//                     //required
//                     onChange={handleChange}
//                   />
//                 </label>
//               </p>
//               <p>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   //disabled={disableButton}
//                   data-testid="signUpButton"
//                 >
//                   update
//                 </button>
//               </p>

//               {!error ? (
//                 <br />
//               ) : (
//                 <div
//                   className="error"
//                   onClick={resetError}
//                 >
//                   <p data-testid="error"> {error}</p>
//                 </div>
//               )}
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
//               }

export default UpdateUser;
