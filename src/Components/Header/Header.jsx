import logo from "./logo.svg";
import styles from "./Header.module.css";
import search from "../../Images/search.svg";
import back from "../../Images/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeContext } from "../../Context/Typestate";
import { useContext, useEffect, useState } from "react";
import IOSSwitch from "../IOSSwitch";
import Snowfall from "react-snowfall";
import {
  SnowFallColor,
  SnowFallCount,
  SnowFallStartTimer,
} from "../../Config/Config";
import { GetMsg } from "../../Config/GetMsg";

const Header = () => {
  const { pathname } = useLocation();
  const { type } = useContext(TypeContext);
  const [isTop, setisTop] = useState(true);
  const [Snow, setSnow] = useState(false);
  const Msg=GetMsg();
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY < 3) setisTop(true);
    else setisTop(false);
  };

  const handleClick = () => {
    setSnow(true);
  };

  function ClickMainFunction(fun, time, countnumber) {
    let timer = false;
    let count = 0;
    return function () {
      count++;
      if (count === countnumber) {
        fun.call();
      } else if (!timer) {
        timer = true;
        setTimeout(() => {
          console.log("timer reset", count);
          timer = false;
          count = 0;
        }, time);
      }
    };
  }

  const Click = ClickMainFunction(
    handleClick,
    SnowFallStartTimer,
    SnowFallCount
  );

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={styles.Container}
        style={{
          backdropFilter: `blur(${isTop ? 0 : "10px"})`,
          backgroundColor: isTop ? "transparent" : "#ffffff3d",
        }}
      >
        <div className={styles.leftContainer}>
          {pathname === "/" ? (
            <img src={logo} width={35} height={35} alt="" />
          ) : (
            <div className={styles.BackButton} onClick={() => navigate(-1)}>
              <img src={back} width={25} height={25} alt="" />
            </div>
          )}
          <div className={styles.text} onClick={Click}>
            {Msg}
          </div>
        </div>
        <div className={styles.rightcontainer}>
          {pathname.includes("=") && <IOSSwitch />}
          <Link to="/search">
            <img src={search} width={25} height={25} alt="" />
          </Link>
        </div>
      </div>
      {Snow && (
        <Snowfall
          color={SnowFallColor}
          style={{
            zIndex: 1400,
            position: "fixed",
          }}
          // snowflakeCount={200}
        />
      )}
    </>
  );
};

export default Header;
