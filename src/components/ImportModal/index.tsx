import { useCallback, useState } from "react";
import { CopyIcon, ScanIcon } from "@phosphor-icons/react";

import ActivityConverter from "@/services/activity-converter";
import type Activity from "@/models/Activity";
import QrCodeScanner from "../QrCodeScanner";
import Button from "../Button";
import Modal from "../Modal";
import Message from "../Message";
import { ButtonContainer } from "./style";

interface ImportModalProps {
  id: string;
  onData: (data: Activity[]) => void;
}

type SuccessType = "qr-code" | "clipboard";

function ImportModal({ id, onData }: ImportModalProps) {
  const [renderScanner, setRenderScanner] = useState(false);
  const [scanTimedOut, setScanTimedOut] = useState(false);
  const [success, setSuccess] = useState<SuccessType | null>(null);
  const [error, setError] = useState("");
  const maxTimeScanning = "10s";

  const reset = useCallback(() => {
    setError("");
    setSuccess(null);
    setScanTimedOut(false);
  }, []);

  const startScanning = useCallback(() => {
    reset();
    setRenderScanner(true);
  }, [reset]);

  const timeoutScanning = useCallback(() => {
    setScanTimedOut(true);
    setRenderScanner(false);
  }, []);

  const convertAndEmitData = useCallback(
    (csv: string, successType: SuccessType) => {
      if (!csv) {
        setError("Couldn't import: No data was found");
        return;
      }

      try {
        const activities = ActivityConverter.revertToArray(csv);
        onData(activities);
        setSuccess(successType);
        setRenderScanner(false);
      } catch (err) {
        setError(`Couldn't import: ${(err as Error).message}`);
      }
    },
    [onData],
  );

  const importFromClipboard = useCallback(async () => {
    reset();
    const csv = await navigator.clipboard.readText();
    convertAndEmitData(csv, "clipboard");
  }, [convertAndEmitData, reset]);

  return (
    <Modal id={id} title="Import activities" onClose={reset}>
      {renderScanner && (
        <QrCodeScanner
          onScan={(data) => convertAndEmitData(data, "qr-code")}
          onTimeout={timeoutScanning}
          maxTimeScanning={maxTimeScanning}
        />
      )}

      <ButtonContainer>
        <Button onClick={startScanning}>
          Scan QR Code <ScanIcon />
        </Button>
        <p>or</p>
        <Button onClick={importFromClipboard}>
          Import from clipboard <CopyIcon />
        </Button>
      </ButtonContainer>
      {error && <Message type="error">{error}</Message>}
      {scanTimedOut && (
        <Message type="notice">
          Looked for a QR code for {maxTimeScanning} and still no luck...
          Perhaps change lighting and try again?
        </Message>
      )}
      {success === "qr-code" && (
        <Message type="success">
          QR code found! Activities updated {":)"}
        </Message>
      )}
      {success === "clipboard" && (
        <Message type="success">
          Successfully imported from clipboard! Activities updated {":)"}
        </Message>
      )}
    </Modal>
  );
}

export default ImportModal;
