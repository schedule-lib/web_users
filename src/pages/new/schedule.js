import styles from '../../styles/pages/NewSchedule.module.css';

import Button from '../../components/Button';

function NewSchedule() {
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
          <form>
            <input placeholder="Digite o seu nome" type="text" />
            <input placeholder="Digite o seu telefone" type="text" />
            <input placeholder="Digite o número do seu BI" type="text" />
            <Button type="submit">Iniciar agendamento</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewSchedule;
