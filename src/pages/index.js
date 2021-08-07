import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '../services/api';

import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ScheduleService from '../modals/ScheduleService';

export default function Home({ episodes }) {
  const [isActive, setIsActive] = useState(false);
  const [userPosition, setUserPosition] = useState({});

  function handleModal() {
    if (!isActive && userPosition?.latitude) {
      localStorage.setItem('user_position', JSON.stringify(userPosition));
    }
    setIsActive(!isActive);
  }

  function getUserPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition({ latitude, longitude });
    });
  }

  const history = useRouter();
  async function navigateToNewSchedule() {
    await history.push('/new/schedule');
  }

  useEffect(() => {
    getUserPosition();
  }, []);

  return (
    <>
      {isActive && <Header />}

      <div className={isActive ? styles.modalActived : styles.container}>
        {isActive ? (
          <ScheduleService episodes={episodes} />
        ) : (
          <>
            <div className={styles.landInfo}>
              <strong>Sistema de agendamento para todos serviços</strong>
              <span>Agende seus horários</span>
              <span>facilite o seu processo</span>

              <button
                onClick={navigateToNewSchedule}
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
    })
  );

  return {
    props: {
      episodes: serialized,
    },
  };
}
