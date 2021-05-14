import { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';

import api from '../services/api';

// import Header from '../components/Header';
import styles from '../styles/modals/ScheduleServices.module.css';

function ScheduleService({ history }) {
  const [data, setData] = useState([]);
  const [servicesIsLoading, setServicesIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [userName, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [completed, setCompleted] = useState(() => {
    if (serviceName && userName && phoneNumber) {
      return true;
    }

    return false;
  });

  const uid = '0934tnwd9432rml02345';

  function handleSubmit(e) {
    if (serviceName && userName && phoneNumber) {
      setCompleted(true);
      return;
    }

    alert('Preencha todos os campos necessários');
  }
  const getDatas = useCallback(async () => {
    setServicesIsLoading(true);

    try {
      const response = await api.get('/services');
      const { data } = response;

      const serialized = data.map((service) =>
        Object.assign(service, {
          addresses: JSON.parse(service.addresses),
          months: JSON.parse(service.months),
          required_field: JSON.parse(service.required_field),
        })
      );

      setData(serialized);
      setServicesIsLoading(false);
    } catch (error) {
      alert('Connection Error - ' + error.message);
    }
  }, [uid]);

  useEffect(() => {
    getDatas();
  }, []);

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
              {servicesIsLoading ? (
                <option default>CARREGANDO...</option>
              ) : (
                data.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <form action="#" method="post">
            {servicesIsLoading ? (
              <h1>CARREGANDO...</h1>
            ) : (
              <>
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

                {data?.map((service) => (
                  <div key={Math.random() * 10} className={styles.groupBox}>
                    <label htmlFor="name">{service.required_field.label}</label>
                    <input
                      placeholder="compo necessário"
                      type={service.required_field.type}
                      required
                    />
                  </div>
                ))}
              </>
            )}
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
