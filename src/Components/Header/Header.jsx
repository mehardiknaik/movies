import logo from "./logo.svg";
import styles from "./Header.module.css";
import search from "../../Images/search.svg";
import back from "../../Images/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeContext } from "../../Context/Typestate";
import { useContext } from "react";

const Header = () => {
  const { pathname } = useLocation();
  const { type } = useContext(TypeContext);
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <div className={styles.leftContainer}>
        {pathname == "/" ? (
          <img src={logo} width={35} height={35} alt="" />
        ) : (
          <div onClick={() => navigate(-1)}>
            <img src={back} width={25} height={25} alt="" />
          </div>
        )}
        <div className={styles.text}>{type.toUpperCase()}</div>
      </div>
      {pathname != "/search" && (
        <div>
          <Link to="/search">
            <img src={search} width={25} height={25} alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
