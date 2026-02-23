import type { ActivityType } from "@/models/ActivityType";
import {
  IslandIcon,
  MapPinIcon,
  PanoramaIcon,
  PizzaIcon,
} from "@phosphor-icons/react";
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
export function getTimeString(timeMins: number) {
  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;

  const fullHours = Math.floor(timestring(timeMins * MIN, "h"));
  const fullMinutes = Math.floor(
    timestring(timeMins * MIN - fullHours * HOUR, "m"),
  );

  let str = "";

  if (fullHours > 0) str += `${fullHours}h`;
  if (fullMinutes > 0) str += `${fullMinutes}m`;

  return str;
}

export function getActivityTypeIcon(type: ActivityType) {
  switch (type) {
    case "Beach":
      return <IslandIcon size={32} color="#dfc365" />;
    case "Landmark":
      return <PanoramaIcon size={32} color="#5d9946" />;
    case "Restaurant":
      return <PizzaIcon size={32} color="#d88a31" />;
    case "Spot":
      return <MapPinIcon size={32} color="#aa4e4e" />;
  }
}
