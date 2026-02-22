import { useCallback } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

import type Activity from "@/models/Activity";
import AddActivityModal from "@/components/AddActivityModal";
import ActivityTable from "@/components/ActivityTable";
import ExportModal from "@/components/ExportModal";
import Button from "@/components/Button";
import ImportModal from "@/components/ImportModal";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { Container } from "./style";

export default function HomePage() {
  const [activities, setActivities] = useLocalStorageState<Activity[]>({
    storageKey: "activities",
    initialValue: [],
  });

  const addActivity = useCallback(
    (activity: Activity) =>
      setActivities((current) =>
        current ? [...current, activity] : [activity],
      ),
    [],
  );

  const removeActivity = useCallback(
    (id: Activity["id"]) =>
      setActivities((currentList) => {
        if (!currentList) return [];

        const idx = currentList.findIndex((activity) => activity.id === id);

        if (idx === -1) return currentList;

        return currentList.toSpliced(idx, 1);
      }),
    [],
  );

  return (
    <Container>
      <h1>Table of Activities</h1>
      <div className="btn-group">
        <Button command="show-modal" commandfor="scan-qrcode-modal">
          Import <ArrowUpIcon />
        </Button>
        <Button
          disabled={!activities || activities.length === 0}
          command="show-modal"
          commandfor="show-qrcode-modal"
        >
          Export <ArrowDownIcon />
        </Button>
        <Button command="show-modal" commandfor="activity-modal">
          Add Activity
        </Button>
      </div>
      {activities != null && activities.length > 0 ? (
        <>
          <ActivityTable
            activities={activities}
            onRemove={(id) => removeActivity(id)}
          />
          <ExportModal id="show-qrcode-modal" data={activities} />
        </>
      ) : (
        <p className="no-activity">Nenhuma atividade ainda! :c</p>
      )}

      <AddActivityModal
        id="activity-modal"
        onAdd={(a: Activity) => addActivity(a)}
      />
      <ImportModal
        id="scan-qrcode-modal"
        onData={(data) => setActivities(data)}
      />
    </Container>
  );
}
