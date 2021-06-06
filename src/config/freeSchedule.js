export default function freeSchedule() {
  const hours = [
    { id: 1, hour: '07:30', status: 'available' },
    { id: 2, hour: '08:00', status: 'available' },
    { id: 3, hour: '08:30', status: 'available' },
    { id: 4, hour: '09:30', status: 'available' },
    { id: 5, hour: '10:00', status: 'available' },
    { id: 6, hour: '11:30', status: 'available' },
    { id: 7, hour: '12:30', status: 'available' },
    { id: 8, hour: '13:30', status: 'unavailable' },
    { id: 9, hour: '14:00', status: 'available' },
    { id: 10, hour: '14:30', status: 'available' },
    { id: 11, hour: '15:00', status: 'available' },
    { id: 12, hour: '15:30', status: 'available' },
    { id: 13, hour: '16:30', status: 'unavailable' },
    { id: 14, hour: '17:00', status: 'available' },
    { id: 15, hour: '17:30', status: 'available' },
    { id: 16, hour: '18:00', status: 'available' },
  ];
  return hours;
}
