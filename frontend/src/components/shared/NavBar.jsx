import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../auth/authSlice";

const NavBar = () => {
  const authMode = useSelector((state) => state.auth.authMode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <nav>
      <div>
        <span>
          <Link to={"/"}>CookBook</Link>
        </span>
      </div>

      <div>
        {user ? (
            <div>
          <button onClick={() => dispatch(logOutAction())}>{authMode}</button>
          <button><Link to={"/form/add"}>ajouter une recette</Link></button>
          </div>
        ) : (
          <button>
            <Link to={"/auth"}>{authMode}</Link>
          </button>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
