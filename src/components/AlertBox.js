import { useRouter } from 'next/router';

import styles from '../styles/components/AlertBox.module.css';

function AlertBox({ terminate }) {
  const router = useRouter();

  function handleNavigation() {
    router.push('/resume');
  }

  return (
    <div className={styles.alertContainer}>
      <div>
        <strong>Processo concluído</strong>
        <p>O seu processo foi agendado com sucesso!</p>
        <p>Apresente o comprovante gerado no dia de atendimento</p>
        {/* <strong className={styles.center}></strong> */}
      </div>
      <hr className={styles.hr} />

      <div className={styles.alertBottom}>
        <button
          onClick={() => {
            terminate();
            handleNavigation();
          }}
          type="button"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default AlertBox;
