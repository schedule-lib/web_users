import styles from '../styles/components/Header.module.css';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.ilustration}>
          <img
            src="icons/sigla_aoa.svg"
            alt="logo"
            draggable={false}
            className={styles.imgLogo}
          />
        </div>

        <div>
          <strong>Sistema de agendamento</strong>
        </div>
      </div>

      <div className={styles.languageMenu}>
        <select className={styles.languageItem} name="language" id="lang">
          <option value="pt">Português</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
