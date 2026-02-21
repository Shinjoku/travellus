import timestring from "timestring";

interface GetVideoFramesArgs {
  fps: number;
  maxTime: string;
  onFrame: (frame: ImageData, stopCallback: () => void) => void;
  onTimeout: () => void;
}

class CameraHandler {
  private _videoElt: HTMLVideoElement;
  private _canvasElt: HTMLCanvasElement;
  private _cameraStream?: MediaStream;
  private _active: boolean = false;

  constructor(videoElt: HTMLVideoElement, canvasElt: HTMLCanvasElement) {
    this._videoElt = videoElt;
    this._canvasElt = canvasElt;
  }

  async isPermissionDenied() {
    const status = await navigator.permissions.query({ name: "camera" });
    return status.state === "denied";
  }

  async openCamera() {
    this._cameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        autoGainControl: { ideal: true },
      },
    });

    this._videoElt.style.display = "block";
    await this._attachCameraToVideo();
  }

  async closeCamera() {
    if (!this._cameraStream) return;

    this._active = false;

    this._videoElt.srcObject = null;
    this._videoElt.style.display = "none";

    this._cameraStream.getTracks().forEach((track) => track.stop());
    delete this._cameraStream;
  }

  async watchVideoFrames({
    fps,
    maxTime,
    onFrame,
    onTimeout,
  }: GetVideoFramesArgs) {
    const maxTimeMs = timestring(maxTime, "milliseconds");
    let elapsedTime = 0;
    let startTime: number;
    const intervalMs = Math.floor(1000 / fps);

    this._active = true;

    const pauseBriefly = async () =>
      await new Promise((resolve) => setTimeout(resolve, intervalMs));

    while (this._active) {
      startTime = performance.now();

      requestAnimationFrame(() => {
        const frame = this._getVideoFrame();
        if (!frame) return;

        onFrame(frame, () => this.closeCamera());
        elapsedTime += performance.now() - startTime;

        if (elapsedTime > maxTimeMs) {
          this.closeCamera();
          onTimeout();
        }
      });

      await pauseBriefly();
      elapsedTime += intervalMs;
    }
  }

  private async _attachCameraToVideo() {
    if (!this._cameraStream) return;

    this._videoElt.srcObject = this._cameraStream;

    await new Promise<void>((resolve) => {
      this._videoElt.onloadeddata = () => {
        this._videoElt.play().then(resolve);
      };
    });
  }

  private _getVideoFrame() {
    const canvas = this._canvasElt;
    const video = this._videoElt;
    const ctxt = canvas.getContext("2d", { willReadFrequently: true })!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctxt.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return ctxt.getImageData(0, 0, video.videoWidth, video.videoHeight);
  }
}

export default CameraHandler;
