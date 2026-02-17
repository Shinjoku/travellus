import type { ActivityType } from "./ActivityType";

export default interface Activity {
  type: ActivityType;
  name: string;
  neighborhood: string;
  duration: number;
  location: string;
  price: number;
}
