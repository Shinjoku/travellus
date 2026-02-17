import { ArrowDownIcon, TrashIcon } from "@phosphor-icons/react";

import type Activity from "../../models/Place";
import { StyledTable } from "./style";
import { formatCurrency, capitalize } from "../../util";
import { useEffect, useState } from "react";

interface ActivityTableProps {
  activities: Activity[];
  onRemove: (idx: number) => void;
}

export function ActivityTable({ activities, onRemove }: ActivityTableProps) {
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

  const rows = tableActivities.map((i, idx) => (
    <tr key={i.name}>
      <td>{i.type}</td>
      <td>{i.name}</td>
      <td>{i.duration}</td>
      <td>{i.location}</td>
      <td>{i.neighborhood}</td>
      <td>{formatCurrency(i.price)}</td>
      <td>
        <TrashIcon onClick={() => onRemove(idx)} />
      </td>
    </tr>
  ));

  return (
    <StyledTable>
      <thead>
        <tr>
          {headers}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </StyledTable>
  );
}
