import { useState } from 'react';
import api from '../services/api';

import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ScheduleService from '../modals/ScheduleService';

export default function Home({ episodes }) {
  const [isActived, setIsActived] = useState(false);

  function handleModal() {
    setIsActived(!isActived);
  }

  return (
    <>
      {isActived && <Header />}

      <div className={isActived ? styles.modalActived : styles.container}>
        {isActived ? (
          <ScheduleService episodes={episodes} />
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

export async function getServerSideProps() {
  const response = await api.get('/services');
  const { data } = response;

  const serialized = data.map((service) =>
    Object.assign(service, {
      addresses: JSON.parse(service.addresses),
      months: JSON.parse(service.months),
      required_field: JSON.parse(service.required_field),
    })
  );

  return {
    props: {
      episodes: serialized,
    },
  };
}
