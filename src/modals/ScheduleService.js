import { useState, useEffect, useCallback } from 'react';
import { useRouter, withRouter } from 'next/router';

import api from '../services/api';

// import Header from '../components/Header';
import styles from '../styles/modals/ScheduleServices.module.css';

function ScheduleService() {
  const [data, setData] = useState([]);
  const [servicesIsLoading, setServicesIsLoading] = useState(true);
  const [serviceName, setServiceName] = useState('');
  const [required, setRequired] = useState(() => {
    const resume = {
      serviceName,
    };

    return resume;
  });

  const uid = '0934tnwd9432rml02345';
  const router = useRouter();

  function handleSubmit() {
    if (serviceName) {
      router.push(`/schedule?session_=${uid}`);
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
          fields_to_fill: JSON.parse(service.fields_to_fill),
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
              {servicesIsLoading ? (
                <option default>CARREGANDO...</option>
              ) : (
                data.map((service) => (
                  <option key={service.id} value={serviceName}>
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
              data.map((service) => {
                return service.fields_to_fill.map((fields) => (
                  <div key={Math.random() * 10} className={styles.groupBox}>
                    <label htmlFor="name">{fields.label}</label>
                    <input
                      placeholder="compo necessário"
                      type={fields.type}
                      required
                    />
                  </div>
                ));
              })
            )}
          </form>
        </div>
        <div className={styles.docsNeededs}>
          <strong>Documentos necessários no dia de realizar o serviço</strong>
          <div>
            <span>* Depende da instituição</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleSubmit} className={styles.default} type="submit">
          Iniciar agendamento
        </button>
      </div>
    </div>
  );
}

export default withRouter(ScheduleService);
