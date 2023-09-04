import "../Signup/newUserPage.css";
import FormDeleteUser from "./FormDeleteUser";
import { getIsLogged } from "../../../redux/selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function DeleteUserPage() {
  const isLogged = useSelector(getIsLogged);

  return (
    <section id="neu-user" className="masthead">
      {isLogged ? (
        <div className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
          <div className="text-center">
            <h1 className="mx-auto my-0 text-uppercase">Delete User</h1>
            <FormDeleteUser />
          </div>
        </div>
      ) : (
        <NavLink to="/login" />
      )}
    </section>
  );
}

export default DeleteUserPage;
