import logo from "./logo.svg";
import styles from "./Header.module.css";
import search from "../../Images/search.svg";
import back from "../../Images/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeContext } from "../../Context/Typestate";
import { useContext, useEffect, useState } from "react";
import IOSSwitch from "../IOSSwitch";

const Header = () => {
  const { pathname } = useLocation();
  const { type } = useContext(TypeContext);
  const [isTop, setisTop] = useState(true);
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY < 3) setisTop(true);
    else setisTop(false);
  };
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={styles.Container}
      style={{
        backdropFilter: `blur(${isTop ? 0 : "10px"})`,
        backgroundColor: isTop ? "transparent" : "#ffffff3d",
      }}
    >
      <div className={styles.leftContainer}>
        {pathname == "/" ? (
          <img src={logo} width={35} height={35} alt="" />
        ) : (
          <div className={styles.BackButton} onClick={() => navigate(-1)}>
            <img src={back} width={25} height={25} alt="" />
          </div>
        )}
        <div className={styles.text}>{type.toUpperCase()}</div>
      </div>
        <div className={styles.rightcontainer}>
          {pathname.includes('=')&&<IOSSwitch />}
          <Link to="/search">
            <img src={search} width={25} height={25} alt="" />
          </Link>
        </div>
    </div>
  );
};

export default Header;
