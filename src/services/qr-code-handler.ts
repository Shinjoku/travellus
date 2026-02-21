import QRCode from "qrcode";
import jsQR from "jsqr";

class QrCodeHandler {
  static async createCodeAndShowOnCanvas(
    data: string,
    canvasElt: HTMLCanvasElement,
  ) {
    return await new Promise<void>((resolve, reject) => {
      QRCode.toCanvas(canvasElt, data, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  static scanQrCodeFromImage(image: ImageData) {
    return jsQR(image.data, image.width, image.height, {
      inversionAttempts: "attemptBoth",
    });
  }
}

export default QrCodeHandler;
