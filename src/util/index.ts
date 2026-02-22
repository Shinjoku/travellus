import timestring from "timestring";

export function formatCurrency(value: number): string {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.substring(1);
}

export function generateId() {
  return crypto.randomUUID();
}

// receives minutes and turns into `${hours}h ${minutes}m`
export function getTimeString(timeMs: number) {
  const fullHours = Math.floor(timestring(timeMs, "h"));
  const fullMinutes = Math.floor(
    timestring(timeMs - fullHours * 60 * 60 * 1000, "m"),
  );

  let str = "";

  if (fullHours > 0) str += `${fullHours}h`;
  if (fullMinutes > 0) str += `${fullMinutes}m`;

  return str;
}
