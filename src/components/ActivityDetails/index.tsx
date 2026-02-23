import type Activity from "@/models/Activity";
import { Details } from "./style";

interface ActivityDetailsProps {
  activity: Activity;
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  return (
    <Details>
      {activity.location !== " " && <span>{activity.location}</span>}
    </Details>
  );
}
