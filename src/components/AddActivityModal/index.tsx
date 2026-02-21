import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import timestring from "timestring";

import type Activity from "../../models/Place";
import type { ActivityType } from "../../models/ActivityType";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { ActivityForm, Label } from "./style";

interface AddActivityModalProps {
  id: string;
  onAdd: (activity: Activity) => void;
}

export default function AddActivityModal({ id, onAdd }: AddActivityModalProps) {
  const [data, setData] = useState<Record<keyof Activity, string>>({
    type: "",
    name: "",
    duration: "",
    location: "",
    neighborhood: "",
    price: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const reset = useCallback(() => {
    setData({
      type: "",
      name: "",
      duration: "",
      location: "",
      neighborhood: "",
      price: "",
    });
  }, []);

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
        type: data.type as ActivityType,
        duration: timestring(data.duration, "minutes"),
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
          <select value={data.type} onChange={(e) => handleChange(e, "type")}>
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
            value={data.name}
            onChange={(e) => handleChange(e, "name")}
            placeholder="Poteito Lanches"
          />
        </Label>
        <Label>
          Location
          <Input
            value={data.location}
            onChange={(e) => handleChange(e, "location")}
            placeholder="R. Salame Frito, 420"
          />
        </Label>
        <Label>
          Duration
          <Input
            value={data.duration}
            onChange={(e) => handleChange(e, "duration")}
            placeholder="i.e: 1h 2m"
          />
        </Label>
        <Label>
          Neighborhood
          <Input
            value={data.neighborhood}
            onChange={(e) => handleChange(e, "neighborhood")}
            placeholder="Pretty Place™"
          />
        </Label>
        <Label>
          Price
          <Input
            value={data.price}
            onChange={(e) => handleChange(e, "price")}
            placeholder="R$ ∞"
          />
        </Label>
        <Button className="submit-btn" type="submit">
          Add Activity
        </Button>
      </ActivityForm>
    </Modal>
  );
}
