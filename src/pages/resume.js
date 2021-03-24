import React from 'react';

import styles from '../styles/pages/Resume.module.css';

const Resume = () => {
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
              <p>Campinas/SP, 12/03/2020</p>
            </div>

            <div className={styles.mapGroup}>
              <strong>DADOS PESSOAIS</strong>
              <ul>
                <li>
                  <span className={styles.hit}>Número do BI:</span>
                  <span className={styles.hit}>22354578980085632345</span>
                </li>
                <li>
                  <span className={styles.hit}>Nome completo:</span>
                  <span className={styles.hit}>elias alexandre</span>
                </li>
                <li>
                  <span className={styles.hit}>Data de nascimento:</span>
                  <span className={styles.hit}>10/10/2020</span>
                </li>
              </ul>
            </div>

            <div className={styles.mapGroup}>
              <strong>DADOS DO AGENDAMENTO</strong>
              <ul>
                <li>
                  <span className={styles.hit}>Data/Hora do Agendamento:</span>
                  <span className={styles.hit}>22/01/2020 14:30</span>
                </li>
                <li>
                  <span className={styles.hit}>Posto:</span>
                  <span className={styles.hit}>
                    PSD/WSD/DWE - Posto de criação de BI
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.mapGroup}>
              <strong>ENDEREÇO DO POSTO</strong>
              <p>
                Rodovia Santos Dumont, Km 66, Edificio garagem, Bairro parque
                viracopos, Aeroporto internacional de viracopos.
              </p>
              <p>Campinas - SP - 13183344</p>
            </div>
          </div>
        </div>

        <div className={styles.loadFile}>
          <button type="button">Baixar uma cópia</button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
