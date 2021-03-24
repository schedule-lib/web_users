export default function determineCurrentMonth(currentMonth = 1) {
  let currrentName = 'JANEIRO';

  switch (currentMonth) {
    case 2:
      currrentName = 'FEVEREIRO';
      break;

    case 3:
      currrentName = 'MARÇO';
      break;

    case 4:
      currrentName = 'ABRIL';
      break;

    case 5:
      currrentName = 'MAIO';
      break;

    case 6:
      currrentName = 'JUNHO';
      break;

    case 7:
      currrentName = 'JULHO';
      break;

    case 8:
      currrentName = 'AGOSTO';
      break;

    case 9:
      currrentName = 'SETEMBRO';
      break;

    case 10:
      currrentName = 'OUTUBRO';
      break;

    case 11:
      currrentName = 'NOVEMBRO';
      break;

    case 12:
      currrentName = 'DEZEMBRO';
      break;

    default:
      break;
  }

  return {
    id: currentMonth,
    name: currrentName,
  };
}
