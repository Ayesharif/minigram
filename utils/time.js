export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = (now - past) / 1000; // seconds

  const mins = diff / 60;
  const hours = mins / 60;
  const days = hours / 24;

  if (diff < 60) return "just now";
  if (mins < 60) return `${Math.floor(mins)} min ago`;
  if (hours < 24) return `${Math.floor(hours)} hours ago`;
  if (days < 7) return `${Math.floor(days)} days ago`;

  // For older dates, show formatted date
  return past.toLocaleDateString();
}