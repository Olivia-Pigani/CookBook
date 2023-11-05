import { useRef } from "react";
import style from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { postSignIn, setAuthMode, setUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthFormSubmission = async (e) => {
    e.preventDefault();

    dispatch(
      postSignIn({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })

      
    );

    dispatch(setUser({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }))

    dispatch(setAuthMode("Se déconnecter"))

    navigate("/");
  };

  return (
    <>
      <h1>Authentification</h1>

      <form action="#" onSubmit={handleAuthFormSubmission}>
        <div className={style.labelsAndInputs}>
          <div className={style.divLabels}>
            <label htmlFor="login">email : </label>
            <label htmlFor="password">password : </label>
          </div>

          <div className={style.divInputs}>
            <input type="text" name="login" ref={loginRef} required />
            <input type="password" name="password" ref={passwordRef} required />
          </div>
        </div>
        <div>
          <button>Valider</button>
        </div>
      </form>
    </>
  );
};
export default AuthForm;
