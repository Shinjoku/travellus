import type Activity from "@/models/Activity";
import { Card, CardAction, CardInfo, CollapseButton } from "./style";
import { ActionButton } from "../ActivityTable/style";
import { TrashIcon } from "@phosphor-icons/react";
import { formatCurrency, getActivityTypeIcon, getTimeString } from "@/util";
import { ActivityDetails } from "../ActivityDetails";
import { useState } from "react";

interface ActivityCardProps {
  activity: Activity;
  onRemove: (id: Activity["id"]) => void;
}

export function ActivityCard({ activity, onRemove }: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CollapseButton
      onClick={() => {
        if (activity.location === " ") return;
        setIsOpen(!isOpen);
      }}
    >
      <Card className={isOpen ? "expanded" : ""}>
        <CardInfo>
          <h3>
            {getActivityTypeIcon(activity.type)}
            {activity.name}
          </h3>

          <p>{activity.neighborhood}</p>
          <p>
            <span>{formatCurrency(activity.price)}</span>&nbsp; | &nbsp;
            <span>{getTimeString(activity.duration)}</span>
          </p>
        </CardInfo>
        <CardAction>
          <ActionButton
            icon
            onClick={() => onRemove(activity.id)}
            aria-label="Delete activity"
          >
            <TrashIcon />
          </ActionButton>
        </CardAction>
      </Card>

      {isOpen && activity.location !== " " && (
        <ActivityDetails activity={activity} />
      )}
    </CollapseButton>
  );
}
