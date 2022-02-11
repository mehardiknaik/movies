import logo from "./logo.svg";
import styles from "./Header.module.css";
import back from "../../Images/back.svg";
import search from "../../Images/search.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ title = "Movies", isMovie = false }) => {
  let navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <div className={styles.leftContainer}>
        {isMovie ? (
          <div style={{cursor:'pointer',marginRight:'10px'}} onClick={() => navigate(-1)}>
            <img src={back} width={20} height={20} alt="" />
          </div>
        ) : (
          <img src={logo} width={35} height={35} alt="" />
        )}
        <div className={styles.text}>
          {title}
          {!isMovie && <>(Hindi & Marathi)</>}
        </div>
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
