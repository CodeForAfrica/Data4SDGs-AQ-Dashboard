export function formatDateTime(timestamp) {
  const date = new Date(timestamp).toDateString().split(' ').slice(1).join(' ');
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return { date, time };
}

export default formatDateTime;
