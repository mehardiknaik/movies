import logo from "./logo.svg";
import styles from "./Header.module.css";
import search from "../../Images/search.svg";
import { Link } from "react-router-dom";
import { TypeContext } from "../../Context/Typestate";
import { useContext } from "react";

const Header = () => {
  const { type} = useContext(TypeContext);
  return (
    <div className={styles.Container}>
      <div className={styles.leftContainer}>
        <img src={logo} width={35} height={35} alt="" />
        <div className={styles.text}>{type.toUpperCase()}</div>
      </div>
      <div>
        <Link to="/search">
          <img src={search} width={25} height={25} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
