import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import api from '../../services/api';

import styles from '../../styles/pages/NewSchedule.module.css';

import Button from '../../components/Button';

function NewSchedule({ episodes }) {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [BINumber, setBINumber] = useState('');

  const [serviceOptions, setServiceOptions] = useState([]);

  const handleChangeService = (selectedOption) => {
    setServiceName(selectedOption?.label);
  };

  function setUserInfoInCache() {
    localStorage.clear();
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('service_name', JSON.stringify(serviceName));
    localStorage.setItem('phone_number', JSON.stringify(phoneNumber));
    localStorage.setItem('BI', JSON.stringify(BINumber));
  }

  const history = useRouter();
  async function navigateToInitialSchedule(e) {
    e.preventDefault();

    if (serviceName && username && phoneNumber && BINumber) {
      setUserInfoInCache();
      await history.push(`/schedule?service_name=${serviceName}`);
      return;
    }

    alert('Preencha todos os campos necessários');
  }

  useEffect(() => {
    setServiceOptions([...episodes]);
  }, []);

  return (
    <div id={styles.newScheduleContainer}>
      <aside>
        <img
          src="/assets/illustration.svg"
          alt="ilustração simbolizando perguntas e respostas"
          draggable={false}
        />
        <strong>Agende horários de forma prática</strong>
        <p>Preencha os dados para começar o agendamento!</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img draggable={false} src="/assets/logo.svg" alt="letmeask" />

          <div className={styles.separator}>ou entre em uma outra sala</div>
          <form onSubmit={navigateToInitialSchedule}>
            <div>
              <strong>Serviço a ser agendado</strong>

              <Select
                name="service"
                onChange={handleChangeService}
                options={serviceOptions}
                instanceId="service"
                required
              />
            </div>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite o seu nome"
              type="text"
              required
            />
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Digite o seu telefone"
              type="text"
              required
            />
            <input
              value={BINumber}
              onChange={(e) => setBINumber(e.target.value)}
              placeholder="Digite o número do seu BI"
              type="text"
              required
            />
            <Button type="submit">Iniciar agendamento</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await api.get('/services');
  const { data } = response;

  const services = data.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  return {
    props: {
      episodes: services,
    },
  };
}

export default NewSchedule;
