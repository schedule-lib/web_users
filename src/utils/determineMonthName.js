export default function determineCurrentMonth(currentMonth = 1) {
  let currentName = 'JANEIRO';

  switch (currentMonth) {
    case 2:
      currentName = 'FEVEREIRO';
      break;

    case 3:
      currentName = 'MARÇO';
      break;

    case 4:
      currentName = 'ABRIL';
      break;

    case 5:
      currentName = 'MAIO';
      break;

    case 6:
      currentName = 'JUNHO';
      break;

    case 7:
      currentName = 'JULHO';
      break;

    case 8:
      currentName = 'AGOSTO';
      break;

    case 9:
      currentName = 'SETEMBRO';
      break;

    case 10:
      currentName = 'OUTUBRO';
      break;

    case 11:
      currentName = 'NOVEMBRO';
      break;

    case 12:
      currentName = 'DEZEMBRO';
      break;

    default:
      break;
  }

  return {
    id: currentMonth,
    name: currentName,
  };
}
