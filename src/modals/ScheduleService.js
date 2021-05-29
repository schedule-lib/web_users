import { useState } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';

import styles from '../styles/modals/ScheduleServices.module.css';

function ScheduleService({ episodes }) {
  const [data] = useState(episodes);
  const [serviceName, setServiceName] = useState('');
  const [userName, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [completed, setCompleted] = useState(() => {
    if (serviceName && userName && phoneNumber) {
      return true;
    }

    return false;
  });

  function setUserInfoInCache() {
    localStorage.clear();
    localStorage.setItem('username', JSON.stringify(userName));
    localStorage.setItem('service_name', JSON.stringify(serviceName));
    localStorage.setItem('phone_number', JSON.stringify(phoneNumber));
  }

  function handleSubmit(e) {
    if (serviceName && userName && phoneNumber) {
      setUserInfoInCache();
      setCompleted(true);
      return;
    }

    alert('Preencha todos os campos necessários');
  }

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.serviceContainer}>
        <div className={styles.serviceGroup}>
          <div className={styles.service}>
            <strong>Serviço a ser agendado</strong>
            <select
              name="service"
              id="service"
              onChange={(e) => setServiceName(e.target.value)}
            >
              <option default>Selecione um serviço</option>
              {data.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <form action="#" method="post">
            <div className={styles.groupBox}>
              <label htmlFor="name">Nome: </label>
              <input
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: john due"
                type="text"
                required
              />
            </div>

            <div className={styles.groupBox}>
              <label htmlFor="name">Telefone: </label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="ex: 923.000.0-00"
                type="text"
                required
              />
            </div>
          </form>
        </div>
        <div className={styles.docsNeededs}>
          <strong>Documentos necessários no dia de realizar o serviço</strong>
          <div>
            <span>* Comprovante de agendamento</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleSubmit} className={styles.default} type="submit">
          {completed ? (
            <Link href="/schedule">Iniciar agendamento</Link>
          ) : (
            'Iniciar agendamento'
          )}
        </button>
      </div>
    </div>
  );
}

export default withRouter(ScheduleService);
