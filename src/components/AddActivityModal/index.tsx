import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import timestring from "timestring";

import type Activity from "../../models/Activity";
import type { ActivityType } from "../../models/ActivityType";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { ActivityForm, Label } from "./style";
import { generateId } from "@/util";

interface AddActivityModalProps {
  id: string;
  onAdd: (activity: Activity) => void;
}

export default function AddActivityModal({ id, onAdd }: AddActivityModalProps) {
  const defaultActivityValue = useMemo<Record<keyof Activity, string>>(
    () => ({
      id: "",
      type: "",
      name: "",
      duration: "",
      location: "",
      neighborhood: "",
      price: "",
    }),
    [],
  );

  const [data, setData] = useState(defaultActivityValue);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const reset = useCallback(
    () => setData(defaultActivityValue),
    [defaultActivityValue],
  );

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    prop: keyof Activity,
  ) {
    if (e.target == null) return;
    setData({ ...data, [prop]: e.target.value });
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!dialogRef.current) return;

    try {
      const activity: Activity = {
        ...data,
        id: generateId(),
        type: data.type as ActivityType,
        duration: timestring(data.duration, "ms"),
        price: parseFloat(data.price),
      };

      onAdd(activity);
      dialogRef.current.close();
    } catch (e) {
      console.error("validation error", e);
    }
  }

  return (
    <Modal id={id} title="New activity" ref={dialogRef} onClose={reset}>
      <ActivityForm onSubmit={handleSubmit}>
        <Label>
          Type
          <select
            name="type"
            required
            value={data.type}
            onChange={(e) => handleChange(e, "type")}
          >
            <option value="">Select a type</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Beach">Beach</option>
            <option value="Landmark">Landmark</option>
            <option value="Spot">Spot</option>
          </select>
        </Label>
        <Label>
          Name
          <Input
            name="name"
            autoComplete="off"
            required
            value={data.name}
            onChange={(e) => handleChange(e, "name")}
            placeholder="Poteito Lanches"
          />
        </Label>
        <Label>
          Location
          <Input
            name="location"
            required
            value={data.location}
            onChange={(e) => handleChange(e, "location")}
            placeholder="R. Salame Frito, 420"
          />
        </Label>
        <Label>
          Duration
          <Input
            name="duration"
            required
            value={data.duration}
            onChange={(e) => handleChange(e, "duration")}
            placeholder="i.e: 1h 2m"
          />
        </Label>
        <Label>
          Neighborhood
          <Input
            name="neighborhood"
            required
            value={data.neighborhood}
            onChange={(e) => handleChange(e, "neighborhood")}
            placeholder="Pretty Place™"
          />
        </Label>
        <Label>
          Price
          <Input
            name="price"
            required
            value={data.price}
            onChange={(e) => handleChange(e, "price")}
            placeholder="49.99"
          />
        </Label>
        <Button className="submit-btn" type="submit">
          Add Activity
        </Button>
      </ActivityForm>
    </Modal>
  );
}
