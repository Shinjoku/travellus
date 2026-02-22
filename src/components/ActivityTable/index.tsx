import { useEffect, useState } from "react";
import { ArrowDownIcon, TrashIcon } from "@phosphor-icons/react";

import type Activity from "@/models/Activity";
import { formatCurrency, capitalize } from "@/util";
import { ActionButton, Container } from "./style";

interface ActivityTableProps {
  activities: Activity[];
  onRemove: (id: Activity["id"]) => void;
}

export default function ActivityTable({
  activities,
  onRemove,
}: ActivityTableProps) {
  const [tableActivities, setTableActivities] = useState(activities);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    setTableActivities(activities);
  }, [activities]);

  function handleSort(col: keyof Activity) {
    setTableActivities(
      activities.toSorted((i: Activity, x: Activity) =>
        sortAsc
          ? i[col].toString().localeCompare(x[col].toString())
          : x[col].toString().localeCompare(i[col].toString()),
      ),
    );

    setSortAsc(!sortAsc);
  }

  const headers = Object.keys(tableActivities[0]).map((colName) => (
    <th key={colName} onClick={() => handleSort(colName as keyof Activity)}>
      {capitalize(colName)}
      &nbsp;
      <ArrowDownIcon />
    </th>
  ));

  const rows = tableActivities.map((activity) => (
    <tr key={activity.id}>
      <td>{activity.type}</td>
      <td>{activity.name}</td>
      <td>{activity.duration}</td>
      <td>{activity.location}</td>
      <td>{activity.neighborhood}</td>
      <td>{formatCurrency(activity.price)}</td>
      <td>
        <ActionButton icon onClick={() => onRemove(activity.id)}>
          <TrashIcon />
        </ActionButton>
      </td>
    </tr>
  ));

  return (
    <Container>
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
