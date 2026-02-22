import type { UUID } from "node:crypto";
import type { ActivityType } from "./ActivityType";

export default interface Activity {
  id: UUID;
  type: ActivityType;
  name: string;
  neighborhood: string;
  duration: number;
  location: string;
  price: number;
}
