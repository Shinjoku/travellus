import { useState, useRef, useEffect } from "react";

import QrCodeHandler from "../../services/qr-code-handler";
import CameraHandler from "../../services/camera-handler";
import Message from "../Message";
import { Container } from "./style";

interface QrCodeScannerProps {
  onScan: (data: string) => void;
  onTimeout: () => void;
  maxTimeScanning: string;
}

function QrCodeScanner({ onScan, onTimeout, maxTimeScanning }: QrCodeScannerProps) {
  const [error, setError] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cameraHandler: CameraHandler;

    async function scanQrCode() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      cameraHandler = new CameraHandler(video, canvas);

      if (await cameraHandler.isPermissionDenied()) {
        setError("Permission for camera denied");
        return;
      }

      try {
        await cameraHandler.openCamera();
      } catch (err) {
        console.error("Unable to capture camera", err);
        setError("Unable to capture camera");
        return;
      }

      await cameraHandler.watchVideoFrames({
        fps: 10,
        maxTime: maxTimeScanning,
        onFrame: (frame, stopCb) => {
          const qrCode = QrCodeHandler.scanQrCodeFromImage(frame);

          if (!qrCode) return;

          onScan(qrCode.data);
          stopCb();
        },
        onTimeout,
      });
    }

    scanQrCode();

    return () => {
      if (cameraHandler) cameraHandler.closeCamera();
    };
  }, [videoRef, canvasRef]);

  return (
    <Container>
      {error && <Message type="error">{error}</Message>}
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </Container>
  );
}

export default QrCodeScanner;
