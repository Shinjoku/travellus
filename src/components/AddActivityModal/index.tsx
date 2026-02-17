import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";
import timestring from "timestring";
import { XIcon } from "@phosphor-icons/react";

import type Activity from "../../models/Place";
import Button from "../Button";
import Input from "../Input";
import { ActivityForm, Dialog, Header, Label, Title } from "./style";

interface AddActivityModalProps {
  onAdd: (activity: Activity) => void;
}

export default function AddActivityModal({ onAdd }: AddActivityModalProps) {
  const [data, setData] = useState<Record<keyof Activity, string>>({
    name: "",
    duration: "",
    location: "",
    neighborhood: "",
    price: "",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
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
    <Dialog id="my-dialog" ref={dialogRef}>
      <Header>
        <Title>New activity</Title>
        <Button
          icon
          className="close-btn"
          onClick={() => dialogRef.current?.close()}
        >
          <XIcon />
        </Button>
      </Header>
      <ActivityForm onSubmit={handleSubmit}>
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
    </Dialog>
  );
}
