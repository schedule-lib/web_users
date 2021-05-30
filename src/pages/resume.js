import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect } from 'react';

import styles from '../styles/pages/Resume.module.css';

const Resume = () => {
  const [cacheData, setCacheData] = useState({});

  const router = useRouter();

  const handleUserInfo = useCallback(() => {
    const username = JSON.parse(localStorage.getItem('username'));
    const service_name = JSON.parse(localStorage.getItem('service_name'));
    const phone_number = JSON.parse(localStorage.getItem('phone_number'));
    const province = JSON.parse(localStorage.getItem('province'));
    const service_point = JSON.parse(localStorage.getItem('service_point'));
    const month = JSON.parse(localStorage.getItem('month'));
    const chosen_day = JSON.parse(localStorage.getItem('chosen_day'));
    const schedule_hour = JSON.parse(localStorage.getItem('schedule_hour'));

    setCacheData({
      username,
      service_name,
      phone_number,
      province,
      service_point,
      month,
      chosen_day,
      schedule_hour,
    });
  }, []);
  const closeSchedule = () => {
    localStorage.clear();
    router.push('/');
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <div className={styles.resumeContainer}>
      <div className={styles.modalBox}>
        <div>
          <div className={styles.headerLogo}>
            <div>
              <img
                className={styles.imgLogo}
                draggable={false}
                src="icons/sigla_aoa.svg"
                alt="serviço"
              />
              <p>Serviço de agendamento</p>
            </div>
            <hr />
          </div>

          <div className={styles.containerMap}>
            <div className={styles.mapGroup}>
              <strong>Código de Solicitação: 234589034850986</strong>
              <p>Angola - LOCALIZAÇÃO</p>
            </div>

            <div className={styles.mapGroup}>
              <strong>DADOS PESSOAIS</strong>
              <ul>
                <li>
                  <span className={styles.hit}>Nome completo:</span>
                  <span className={styles.hit}>{cacheData.username}</span>
                </li>
                <li>
                  <span className={styles.hit}>Telefone de contacto:</span>
                  <span className={styles.hit}>{cacheData.phone_number}</span>
                </li>
              </ul>
            </div>

            <div className={styles.mapGroup}>
              <strong>DADOS DO AGENDAMENTO</strong>
              <ul>
                <li>
                  <span className={styles.hit}>Serviço:</span>
                  <span className={styles.hit}>{cacheData.service_name}</span>
                </li>
                <li>
                  <span className={styles.hit}>Data/Hora do Agendamento:</span>
                  <span className={styles.hit}>
                    {cacheData.chosen_day}/{cacheData.month}
                    /2021 - {cacheData.schedule_hour}
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.mapGroup}>
              <strong>ENDEREÇO DO POSTO</strong>
              <p>{cacheData.service_point}</p>
              <p>{cacheData.province} - AOA</p>
            </div>
          </div>
        </div>

        <div className={styles.loadFile}>
          <button onClick={closeSchedule} type="button">
            Iniciar novo agendamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
