import { useCallback, useState, useEffect } from 'react';
import api from '../services/api';
import { useFreeSchedule } from '../config';
import { generateUniqueId } from '../utils';

import Header from '../components/Header';
import AlertBox from '../components/AlertBox';

// STATICs
import styles from '../styles/pages/Timer.module.css';

const Timer = () => {
  const [cacheData, setCacheData] = useState({});
  const [hourSelected, serHourSelected] = useState(Number(0));
  const [schedule, setSchedule] = useState(null);
  const [code, setCode] = useState(null);
  const [completed, setCompleted] = useState(false);

  const hours = useFreeSchedule();

  function setUserInfoInCache() {
    localStorage.setItem('schedule_hour', JSON.stringify(schedule));
    localStorage.setItem('code', JSON.stringify(code));
  }
  const handleUserInfo = useCallback(() => {
    const service_name = JSON.parse(localStorage.getItem('service_name'));
    const month = JSON.parse(localStorage.getItem('month'));
    const chosen_day = JSON.parse(localStorage.getItem('chosen_day'));
    const username = JSON.parse(localStorage.getItem('username'));
    const phone_number = JSON.parse(localStorage.getItem('phone_number'));
    const province = JSON.parse(localStorage.getItem('province'));
    const service_point = JSON.parse(localStorage.getItem('service_point'));

    setCacheData({
      chosen_day,
      month,
      service_name,
      username,
      phone_number,
      province,
      service_point,
    });
  }, []);
  async function closeSchedule() {
    try {
      await api
        .post(
          '/scheduler',
          {
            code,
            hour: String(schedule),
            phone_number: cacheData.phone_number,
            point: cacheData.service_point,
            province: cacheData.province,
            service: cacheData.service_name,
            username: cacheData.username,
            date: cacheData.chosen_day + '/' + cacheData.month + '/2021',
          },
          {
            headers: {
              Authorization: 'Bearer 234t43563bv456b5yy564r6v7567',
            },
          }
        )
        .then(() => {
          setCompleted(true);
        });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  function handleSelectHour(hour, status, to) {
    if (status === 'available') {
      serHourSelected(+hour);
      setSchedule(to);

      return 1;
    }
    if (status === 'unavailable') {
      serHourSelected(Number(0));
      alert('Seleciona apenas HÓRARIO DISPONÍVEL');

      return 0;
    }
  }
  function completeSchedule() {
    if (hourSelected !== 0 && code) {
      setUserInfoInCache();
      closeSchedule();

      return 1;
    }

    alert('SELECIONA UM HORÁRIO DISPONÍVEL');
    return 0;
  }
  function handleComplete() {
    setCompleted(false);
  }

  useEffect(() => {
    handleUserInfo();
    setCode(generateUniqueId());
  }, []);

  return (
    <>
      <Header />
      {completed && <AlertBox terminate={handleComplete} />}

      <div className={styles.timerContainer}>
        <div>
          <div className={styles.service}>
            <strong>Serviço a ser agendado</strong>
            <span>{cacheData.service_name}</span>
            <hr />
            <div>
              <p>
                Dia {cacheData.chosen_day} de {cacheData.month} de 2021
              </p>
              <span>as {schedule && schedule}</span>
            </div>
          </div>

          <div className={styles.hoursGroup}>
            <div>
              <strong>Horários disponíveis</strong>
            </div>

            <div className={styles.hoursMap}>
              {hours.map((hour) => (
                <div
                  key={hour.id}
                  onClick={() =>
                    handleSelectHour(hour.id, hour.status, hour.hour)
                  }
                  className={styles[hour.status]}
                  id={
                    hour.id === hourSelected ? styles.hourSelected : undefined
                  }
                >
                  {hour.hour}
                </div>
              ))}
            </div>

            <button onClick={completeSchedule} type="button">
              Concluir agendamento
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
