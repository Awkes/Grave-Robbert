export default function today() {
  const now = new Date();
  return new Date(`${now.getMonth()+1} ${now.getDate()} ${now.getFullYear()}`);
}