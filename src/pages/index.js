import { useState } from 'react';
import Header from '../components/Header';

import styles from '../styles/Home.module.css';

// MODALs
import ScheduleService from '../modals/ScheduleService';

export default function Home() {
  const [isActived, setIsActived] = useState(false);

  function handleModal() {
    setIsActived(!isActived);
  }

  return (
    <>
      {isActived && <Header />}

      <div className={isActived ? styles.modalActived : styles.container}>
        {isActived ? (
          <ScheduleService />
        ) : (
          <>
            <div className={styles.landInfo}>
              <strong>Sistema de agendamento para todos serviços</strong>
              <span>Agende seus horários</span>
              <span>facilite o seu processo</span>

              <button
                onClick={handleModal}
                type="button"
                className={styles.default}
              >
                Iniciar agendamento
              </button>
            </div>

            <div className={styles.landIlustry}>
              <img
                draggable={false}
                src="icons/sigla_aoa.svg"
                alt="agenda inicial"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
