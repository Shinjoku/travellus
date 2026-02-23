import { useEffect, useState } from "react";
import type Activity from "@/models/Activity";
import { Container } from "./style";
import { ActivityCard } from "../ActivityCard";

interface ActivityDeckProps {
  activities: Activity[];
  onRemove: (id: Activity["id"]) => void;
}

// type SortableCol = Exclude<keyof Activity, "id">;

// interface SortState {
//   col: SortableCol;
//   direction: "asc" | "desc";
// }

export function ActivityDeck({ activities, onRemove }: ActivityDeckProps) {
  const [listActivities, setListActivities] = useState(activities);
  // const [sort, setSort] = useState<SortState | null>(null);

  useEffect(() => {
    setListActivities(activities);
  }, [activities]);

  // function handleSort({ col, direction }: SortState) {
  //   setListActivities(
  //     activities.toSorted((i: Activity, x: Activity) => {
  //       if (typeof i[col] === "string")
  //         return direction === "desc"
  //           ? i[col].localeCompare(x[col].toString())
  //           : (x[col] as string).localeCompare(i[col].toString());

  //       return direction === "desc"
  //         ? i[col] - (x[col] as number)
  //         : (x[col] as number) - i[col];
  //     }),
  //   );

  //   setSort({ col, direction });
  // }

  const cards = listActivities.map((a) => (
    <ActivityCard activity={a} onRemove={onRemove} />
  ));

  return (
    <Container>
      {/* <ActivityFilters onFilter={onFilter}> */}
      {cards}
    </Container>
  );
}
