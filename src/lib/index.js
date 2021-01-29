export function formatDateTime(timestamp) {
  const date = new Date(timestamp).toDateString().split(' ').slice(1).join(' ');
  const time = new Date(timestamp).toLocaleTimeString();
  return { date, time };
}

export default formatDateTime;
