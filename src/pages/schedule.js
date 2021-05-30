import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import api from '../services/api';

import { useFreeDays, useWeekDays } from '../config';

import determineCurrentMonth from '../utils/determineMonthName';
import styles from '../styles/pages/Schedule.module.css';
import Header from '../components/Header';

const Schedule = ({ episodes }) => {
  const [data] = useState(episodes);
  const [days, setDays] = useState(() => {
    const [freeDaysByMonth] = useFreeDays();

    return freeDaysByMonth;
  });

  const [isCompleted, setIsCompleted] = useState(false);
  const [province, setProvince] = useState(null);
  const [servicePoint, setServicePoint] = useState(null);
  const [month, setMonth] = useState(() => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;

    return determineCurrentMonth(currentMonth);
  });
  const [chosenDay, setChosenDay] = useState(0);

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [pointOptions, setPointOptions] = useState([]);

  // CALENDAR INFO
  const weekDays = useWeekDays();

  const setFormattedSelectionData = useCallback(async () => {
    const provinceFormatted = data?.addresses.map((address) => {
      return {
        label: String(address.province),
        value: String(address.province)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      };
    });
    const pointFormatted = data?.addresses.map((address) => {
      return {
        label: String(address.point),
        value: String(address.point)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      };
    });

    setProvinceOptions(provinceFormatted);
    setPointOptions(pointFormatted);
  }, []);
  function setUserInfoInCache() {
    localStorage.setItem('province', JSON.stringify(province?.label));
    localStorage.setItem('service_point', JSON.stringify(servicePoint?.label));
    localStorage.setItem('month', JSON.stringify(month?.name));
    localStorage.setItem('chosen_day', JSON.stringify(chosenDay));
  }

  // CALENDAR hits
  function changeCalendarDays(selectedMonth) {
    const [freeDaysByMonth, allDays] = useFreeDays(selectedMonth);
    setDays(freeDaysByMonth);
  }

  // CALENDAR FUNCTIONS
  const handleCompleted = () => {
    if (province && servicePoint && month.name && chosenDay) {
      setIsCompleted(true);
      return;
    }
  };
  function handleButtonStatus() {
    if (province?.value && servicePoint?.value) {
      return false;
    }

    return true;
  }
  function handleNextMonth() {
    if (month.id === 12) {
      return;
    }

    const currentMonth = month.id;
    const nextMonth = currentMonth + 1;

    setMonth(() => determineCurrentMonth(nextMonth));
    changeCalendarDays(determineCurrentMonth(nextMonth).name);
  }
  function handlePrevMonth() {
    if (month.id === 1) {
      return;
    }

    const currentMonth = month.id;
    const prevMonth = currentMonth - 1;

    setMonth(() => determineCurrentMonth(prevMonth));
    changeCalendarDays(determineCurrentMonth(prevMonth).name);
  }
  const handleChangeProvince = (selectedOption) => {
    setProvince(selectedOption);
  };
  const handleChangeService = (selectedOption) => {
    setServicePoint(selectedOption);
  };
  function handleDay(day, status) {
    if (status === 'available') {
      setChosenDay(+day);

      return 1;
    }
    if (status === 'unavailable') {
      setChosenDay(0);
      alert('Seleciona apenas DIA DISPONÍVEL');

      return 0;
    }
  }

  useEffect(() => {
    setFormattedSelectionData();
  }, []);

  useEffect(() => {
    handleCompleted();
  }, [handleCompleted]);

  return (
    <div className={styles.ScheduleContainer}>
      <Header />

      <main className={styles.mainScheduler}>
        <div className={styles.topSchedule}>
          <div className={styles.localGroup}>
            <div id={styles.top}>
              <strong>O lugar onde será atendido</strong>
            </div>

            <div id={styles.bottom}>
              <div>
                <span>Província de atendimento</span>
                <Select
                  onChange={handleChangeProvince}
                  value={province}
                  name="province"
                  options={provinceOptions}
                  instanceId="service-province"
                />
              </div>
              <div>
                <span>Unidade de atendimento</span>

                <Select
                  onChange={handleChangeService}
                  value={servicePoint}
                  name="service"
                  options={pointOptions}
                  instanceId="services-point"
                />
              </div>
            </div>
          </div>

          <div className={styles.addressDescription}>
            <div id={styles.addrTop}>
              @<span>Área de localização</span>
            </div>
            <div id={styles.addrBottom}>
              <span>{servicePoint?.label || 'Ponto de atendimento'}</span>
              {/* <span>Rua Dr. Antônio Álvares Lobo n*456 - Botafogo</span> */}
              <span>{province?.label || 'Província de atendimento'}</span>
            </div>
            <hr />
            <div id={styles.addrTop}>
              @<span>Data escolhida</span>
            </div>
            <div id={styles.addrBottom}>
              <span>
                dia {chosenDay} de {month.name} 2021
              </span>
            </div>
          </div>
        </div>

        <div className={styles.scheduleBox}>
          <div className={styles.calendarControler}>
            <div className={styles.calendarTop}>
              <button
                disabled={handleButtonStatus()}
                onClick={handlePrevMonth}
                className={styles.buttonController}
                type="button"
              >
                Anterior
              </button>

              <button
                disabled={handleButtonStatus()}
                onClick={handleNextMonth}
                className={styles.buttonController}
                type="button"
              >
                Próximo
              </button>
            </div>

            <div className={styles.calendarBottom}>
              <strong>Mês solicitado</strong>
              <div className={styles.month}>
                <strong>{month.name}</strong>
              </div>
            </div>
          </div>

          <div className={styles.calendarGroup}>
            <div className={styles.calendarHitMapWeek}>
              {weekDays.map((weekDay) => (
                <div key={weekDay.id} id={weekDay.id}>
                  {weekDay.name}
                </div>
              ))}
            </div>

            <div className={styles.calendarHitMapDays}>
              {days.length >= 1 &&
                days.map((day) => (
                  <div
                    onClick={() => handleDay(day.day, day.status)}
                    role="button"
                    key={day.day}
                    tabIndex={0}
                    className={styles[day.status]}
                    id={day.day === chosenDay ? styles.chosenDay : ''}
                  >
                    {day.day}
                  </div>
                ))}
            </div>
          </div>

          {isCompleted && (
            <div className={styles.floatBox}>
              <Link href="/timer">
                <button onClick={setUserInfoInCache} type="button">
                  Escolher horário
                </button>
              </Link>
            </div>
          )}

          <div className={styles.calendarDescription}>
            <div>
              <strong>Descricão dos dias</strong>
            </div>

            <div className={styles.calendarHitDescr}>
              <div>
                <div id={styles.detailAvailable} />
                <span>Disponível</span>
              </div>

              <div>
                <div id={styles.detailUnavailable} />
                <span>Indisponível</span>
              </div>

              <div>
                <div id={styles.detailSelected} />
                <span>Selecionado</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// vai carregar de forma estática, sempre que for acessada a HOME
export async function getServerSideProps() {
  const response = await api.get(`/services/search`, {
    params: {
      service_name: 'Matrícula de novos alunos - UNASP',
    },
  });
  const { data } = response;

  Object.assign(data, {
    addresses: JSON.parse(data.addresses),
    months: JSON.parse(data.months),
  });

  return {
    props: {
      episodes: data,
    },
  };
}

export default Schedule;
