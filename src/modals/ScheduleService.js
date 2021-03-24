import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';

// import Header from '../components/Header';
import styles from '../styles/modals/ScheduleServices.module.css';

function ScheduleService() {
  const [serviceName, setServiceName] = useState('bi');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bi, setBI] = useState('');
  const [telefone, setTelefone] = useState('');

  const uid = '0934tnwd9432rml02345';
  const router = useRouter();

  function handleSubmit() {
    if (serviceName && name && birthday && telefone) {
      router.push(`/schedule?${uid}`);
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
              <option default value={serviceName}>
                renovar BI
              </option>
            </select>
          </div>

          <form action="#" method="post">
            <div className={styles.groupBox}>
              <label forAction="name">Número do BI</label>
              <input
                value={bi}
                onChange={(e) => setBI(e.target.value)}
                placeholder="ex: 2431-234-234-3434"
                type="text"
                name="bi"
                id="bi"
                required
              />
            </div>

            <div className={styles.groupBox}>
              <label forAction="name">Nome completo</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex: elias alexandre"
                type="text"
                name="name"
                id="name"
                required
              />
            </div>

            <div className={styles.groupBox}>
              <label forAction="birthday">Data de nascimento</label>
              <input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="ex: elias alexandre"
                type="date"
                name="birthday"
                id="birthday"
                required
              />
            </div>

            <div className={styles.groupBox}>
              <label forAction="number">Telefone</label>
              <input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="ex: (19) 9xx.xxx.xxx"
                type="text"
                name="number"
                id="number"
                required
              />
            </div>
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
