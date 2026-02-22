import { useCallback, useRef, useState } from "react";
import { ScanIcon, CopyIcon, CheckIcon } from "@phosphor-icons/react";

import QrCodeHandler from "@/services/qr-code-handler";
import ActivityConverter from "@/services/activity-converter";
import type Activity from "@/models/Activity";
import Message from "../Message";
import Button from "../Button";
import { ButtonContainer, Container } from "./style";

interface ExportModalProps {
  id: string;
  data: Activity[];
}

function ExportModal({ id, data }: ExportModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [clipboardSuccess, setClipboardSuccess] = useState(false);
  const [error, setError] = useState("");

  const reset = useCallback(() => {
    setError("");
    setClipboardSuccess(false);
  }, []);

  const exportToCliboard = useCallback(async () => {
    reset();
    const csvData = ActivityConverter.convertToCSV(data);
    await navigator.clipboard.writeText(csvData);
    setClipboardSuccess(true);
  }, []);

  const generateQrCode = useCallback(async () => {
    if (!canvasRef.current) return;

    reset();
    canvasRef.current.style.display = "block";

    try {
      const csv = ActivityConverter.convertToCSV(data);
      await QrCodeHandler.createCodeAndShowOnCanvas(csv, canvasRef.current);
    } catch (error) {
      console.error("Unable to generate QR code.", error);
      setError("Unable to generate QR code >:(");
    }
  }, [canvasRef]);

  return (
    <Container id={id} title="Export activities" onClose={reset}>
      {error && <Message type="error">{error}</Message>}
      <canvas ref={canvasRef}></canvas>
      <ButtonContainer>
        <Button onClick={generateQrCode}>
          Generate QR Code <ScanIcon />
        </Button>
        <p>or</p>
        <Button onClick={exportToCliboard}>
          Export data into clipboard <CopyIcon />
        </Button>
      </ButtonContainer>
      {clipboardSuccess && (
        <Message type="success">
          Exported to clipboard <CheckIcon />
        </Message>
      )}
    </Container>
  );
}

export default ExportModal;
