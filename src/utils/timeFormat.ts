export function formatTimeRemaining(endTimeIso: string): {
  text: string;
  isUrgent: boolean;
  isExpired: boolean;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const end = new Date(endTimeIso).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) {
    return {
      text: 'Auction Closed',
      isUrgent: false,
      isExpired: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let text = '';
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    text = `${days}d ${remHours}h left`;
  } else if (hours > 0) {
    text = `${hours}h ${minutes}m ${seconds}s`;
  } else {
    text = `${minutes}m ${seconds}s`;
  }

  return {
    text,
    isUrgent: hours < 1,
    isExpired: false,
    hours,
    minutes,
    seconds,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
