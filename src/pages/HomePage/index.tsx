import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Container, ModalButton, PortButton } from "./style";
import type Activity from "../../models/Place";
import AddActivityModal from "../../components/AddActivityModal";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

export default function HomePage() {
  const [activities, setActivities] = useState<Activity[] | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("activities");
    if (storedData == null) return;

    const activities = JSON.parse(storedData || "[]") as Activity[];
    setActivities(activities);
  }, []);

  useEffect(() => {
    if (activities == null) return;

    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  function addActivity(activity: Activity) {
    setActivities((current) => {
      if (!current) return [activity];
      return [...current, activity];
    });
  }

  function removeActivity(idx: number) {
    setActivities((current) => {
      if (!current) return [];
      return current.toSpliced(idx, 1);
    });
  }

  async function exportActivities() {
    await navigator.clipboard.writeText(JSON.stringify(activities));
  }

  async function importActivities() {
    setActivities(
      JSON.parse(await navigator.clipboard.readText()) as Activity[],
    );
  }

  return (
    <Container>
      <h1>Table of Activities</h1>
      <PortButton onClick={importActivities}>
        Import <ArrowUpIcon />
      </PortButton>
      <PortButton onClick={exportActivities}>
        Export <ArrowDownIcon />
      </PortButton>

      <ModalButton command="show-modal" commandfor="my-dialog">
        Add Activity
      </ModalButton>

      {activities != null && activities.length > 0 ? (
        <Table
          activities={activities}
          onRemove={(idx: number) => removeActivity(idx)}
        />
      ) : (
        <p>Nenhuma atividade ainda! :c</p>
      )}

      <AddActivityModal onAdd={(a: Activity) => addActivity(a)} />
    </Container>
  );
}
