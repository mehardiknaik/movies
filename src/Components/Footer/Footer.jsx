import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.item}>Design &</div>
        <div className={styles.item}>Devloped by</div>
        <div className={styles.item}>Hardik</div>
      </div>
    </div>
  );
};

export default Footer;
