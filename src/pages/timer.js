import { useState } from 'react';

import Header from '../components/Header';
import AlertBox from '../components/AlertBox';

// STATICs
import styles from '../styles/pages/Timer.module.css';

const Timer = () => {
  const [hourSelected, serHourSelected] = useState(Number(0));
  const [completed, setCompleted] = useState(false);

  const hours = [
    { id: 1, hour: '10:30', status: 'available' },
    { id: 2, hour: '11:30', status: 'available' },
    { id: 3, hour: '23:30', status: 'available' },
    { id: 4, hour: '12:30', status: 'available' },
    { id: 5, hour: '15:30', status: 'available' },
    { id: 6, hour: '10:30', status: 'unavailable' },
    { id: 7, hour: '13:30', status: 'available' },
    { id: 8, hour: '10:30', status: 'available' },
    { id: 9, hour: '14:30', status: 'unavailable' },
    { id: 10, hour: '17:30', status: 'available' },
    { id: 11, hour: '18:30', status: 'available' },
    { id: 12, hour: '19:30', status: 'unavailable' },
    { id: 13, hour: '10:30', status: 'unavailable' },
    { id: 14, hour: '10:30', status: 'available' },
    { id: 15, hour: '10:30', status: 'unavailable' },
    { id: 16, hour: '10:30', status: 'available' },
    { id: 17, hour: '10:30', status: 'unavailable' },
    { id: 18, hour: '10:30', status: 'available' },
    { id: 19, hour: '10:30', status: 'available' },
    { id: 20, hour: '10:30', status: 'available' },
  ];

  function handleSelectHour(hour, status) {
    if (status === 'available') {
      serHourSelected(+hour);

      return 1;
    }
    if (status === 'unavailable') {
      serHourSelected(Number(0));
      alert('Seleciona apenas HÓRARIO DISPONÍVEL');

      return 0;
    }
  }
  function completeSchedule() {
    if (hourSelected !== 0) {
      setCompleted(true);
      // alert('HORÁRIO RESERVADO');

      return 1;
    }

    alert('SELECIONA UM HORÁRIO DISPONÍVEL');
    return 0;
  }
  function handleComplete() {
    setCompleted(false);
  }

  return (
    <>
      <Header />
      {completed && <AlertBox terminate={handleComplete} />}

      <div className={styles.timerContainer}>
        <div>
          <div className={styles.service}>
            <strong>Serviço a ser agendado</strong>
            <span>renovar BI</span>
            <hr />
            <div>
              <p>Dia 03 de março de 2021</p>
              <span>as 17:30</span>
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
                  onClick={() => handleSelectHour(hour.id, hour.status)}
                  className={styles[hour.status]}
                  id={hour.id === hourSelected && styles.hourSelected}
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
