import { TrashIcon } from "@phosphor-icons/react";

import type Activity from "../../models/Place";
import { ActivityTable } from "./style";
import { formatCurrency, capitalize } from "../../util";

interface TableProps {
  activities: Activity[];
  onRemove: (idx: number) => void;
}

export function Table({ activities, onRemove }: TableProps) {
  const headers = Object.keys(activities[0]).map((colName) => (
    <th key={colName}>{capitalize(colName)}</th>
  ));

  const rows = activities.map((i, idx) => (
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
    <ActivityTable>
      <thead>
        <tr>
          {headers}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </ActivityTable>
  );
}
