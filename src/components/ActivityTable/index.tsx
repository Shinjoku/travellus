import { useEffect, useState } from "react";
import { ArrowDownIcon, TrashIcon } from "@phosphor-icons/react";
import clsx from "clsx";

import type Activity from "@/models/Activity";
import { formatCurrency, capitalize, getTimeString } from "@/util";
import { ActionButton, ClearSortButton, Container, SortButton } from "./style";

interface ActivityTableProps {
  activities: Activity[];
  onRemove: (id: Activity["id"]) => void;
}

type SortableCol = Exclude<keyof Activity, "id">;

interface SortState {
  col: SortableCol;
  direction: "asc" | "desc";
}

export default function ActivityTable({
  activities,
  onRemove,
}: ActivityTableProps) {
  const [tableActivities, setTableActivities] = useState(activities);
  const [sort, setSort] = useState<SortState | null>(null);

  useEffect(() => {
    setTableActivities(activities);
  }, [activities]);

  function handleSort({ col, direction }: SortState) {
    setTableActivities(
      activities.toSorted((i: Activity, x: Activity) => {
        if (typeof i[col] === "string")
          return direction === "desc"
            ? i[col].localeCompare(x[col].toString())
            : (x[col] as string).localeCompare(i[col].toString());

        return direction === "desc"
          ? i[col] - (x[col] as number)
          : (x[col] as number) - i[col];
      }),
    );

    setSort({ col, direction });
  }

  const headers = Object.keys(tableActivities[0])
    .filter((key) => key !== "id")
    .map((colName) => (
      <th key={colName}>
        <span>
          {capitalize(colName)}
          <SortButton
            icon
            aria-label={`Sort the ${colName} column in ${sort?.direction === "asc" ? "ascending" : "descending"} order`}
            onClick={() =>
              handleSort({
                col: colName as SortableCol,
                direction: sort?.direction === "asc" ? "desc" : "asc",
              })
            }
            className={clsx({
              active: sort?.col === colName,
              "upside-down":
                sort?.col === colName && sort?.direction === "desc",
            })}
          >
            <ArrowDownIcon />
          </SortButton>
        </span>
      </th>
    ));

  const rows = tableActivities.map((activity) => (
    <tr key={activity.id}>
      <td>{activity.type}</td>
      <td>{activity.name}</td>
      <td>{getTimeString(activity.duration)}</td>
      <td>{activity.location}</td>
      <td>{activity.neighborhood}</td>
      <td>{formatCurrency(activity.price)}</td>
      <td>
        <ActionButton
          icon
          onClick={() => onRemove(activity.id)}
          aria-label="Delete activity"
        >
          <TrashIcon />
        </ActionButton>
      </td>
    </tr>
  ));

  return (
    <Container>
      {sort && (
        <p className="sort-info">
          Sorting by <span className="highlight">{sort.col}</span> in{" "}
          <span className="highlight">
            {sort.direction === "asc" ? "ascending" : "descending"}
          </span>{" "}
          order
          <ClearSortButton onClick={() => setSort(null)}>
            Clear sort
          </ClearSortButton>
        </p>
      )}
      <table>
        <thead>
          <tr>
            {headers}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </Container>
  );
}
