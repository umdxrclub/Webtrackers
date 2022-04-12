declare var cv: any;

export namespace Colors {
    export const BLACK: OpenCV.Scalar = [0,0,0,255];
    export const RED: OpenCV.Scalar = [255,0,0,255];
    export const GREEN: OpenCV.Scalar = [0,255,0,255];
    export const BLUE: OpenCV.Scalar = [0,0,255,255];
    export const YELLOW: OpenCV.Scalar = [255,255,0,255];
    export const MAGENTA: OpenCV.Scalar = [255,0,255,255];
    export const CYAN: OpenCV.Scalar = [0,255,255,255];
    export const WHITE: OpenCV.Scalar = [255,255,255,255];

    export function fromRGB(r: number, g: number, b: number): OpenCV.Scalar {
        return [r,g,b,255];
    }
}

export declare namespace OpenCV {
    export type MatType = number;

    export class Mat {
        cols: number
        rows: number

        data: {
            set: (data: Uint8ClampedArray) => void
        }

        constructor();
        constructor(size: Size, type: number);
        constructor(rows: number, cols: number, type: MatType);
        constructor(rows: number, cols: number, initValue: Scalar);

        static zeros(rows: number, cols: number, type: number): Mat;
        static ones(rows: number, cols: number, type: number): Mat;
        static eye(rows: number, cols: number, type: number): Mat;

        clone(): Mat;
        copyTo(dst: Mat): void;
        convertTo(dst: Mat, rtype: number, alpha?: number, beta?: number): void;
        delete(): void;
        isContinuous(): boolean
        size(): Size
        depth(): number
        channels(): number
        type(): any

        col(col: number): Mat
        row(row: number): Mat
        colRange(start: number, end:number): Mat
        rowRange(start: number, end:number): Mat

        ucharAt(row: number, col: number): number
        charAt(row: number, col: number): number
        ushortAt(row: number, col: number): number
        shortAt(row: number, col: number): number
        intAt(row: number, col: number): number
        floatAt(row: number, col: number): number
        doubleAt(row: number, col: number): number

        ucharPtr(row: number, col: number): Uint8Array
        charPtr(row: number, col: number): Int8Array
        ushortPtr(row: number, col: number): Uint16Array
        shortPtr(row: number, col: number): Int16Array
        intPtr(row: number, col: number): Int32Array
        floatPtr(row: number, col: number): Float32Array
        doublePtr(row: number, col: number): Float64Array
    }

    export class MatVector {
        push_back(mat: Mat): void
        get(index: number): Mat
        delete(): void
        size(): number
    }

    export class DetectorParameters {

    }

    export class ArucoDictionary {
        constructor(id: number)
    }

    export class ArucoBoard {
        constructor(corners: MatVector, dictionary: ArucoDictionary, ids: Mat)
    }

    export class CharucoBoard {
        constructor(squaresX: number, squaresY: number, squareLength: number, markerLength: number, dictionary: OpenCV.ArucoDictionary)
        draw(size: Size, dst: Mat): void
        draw(size: Size, dst: Mat, marginSize: number): void
        draw(size: Size, dst: Mat, marginSize: number, borderBits: number): void
    }

    export type Point = {
        x: number,
        y: number
    }

    export type Size = {
        width: number,
        height: number
    }

    export type Circle = {
        center: number,
        radius: number
    }

    export type Rect = {
        x: number,
        y: number,
        width: number,
        height: number
    }

    /**
     * [R,G,B,Alpha]
     * Each value is 0-255
     */
    export type Scalar = [number, number, number, number];

}

export type OpenCV = {
    Mat: typeof OpenCV.Mat,
    MatVector: typeof OpenCV.MatVector
    aruco_DetectorParameters: typeof OpenCV.DetectorParameters
    aruco_Dictionary: typeof OpenCV.ArucoDictionary
    aruco_CharucoBoard: typeof OpenCV.CharucoBoard
    aruco_Board: typeof OpenCV.ArucoBoard

    // Constants
    CV_8U: OpenCV.MatType;
    CV_8UC1: OpenCV.MatType;
    CV_8UC2: OpenCV.MatType;
    CV_8UC3: OpenCV.MatType;
    CV_8UC4: OpenCV.MatType;
    CV_8S: OpenCV.MatType;
    CV_8SC1: OpenCV.MatType;
    CV_8SC2: OpenCV.MatType;
    CV_8SC3: OpenCV.MatType;
    CV_8SC4: OpenCV.MatType;
    CV_16U: OpenCV.MatType;
    CV_16UC1: OpenCV.MatType;
    CV_16UC2: OpenCV.MatType;
    CV_16UC3: OpenCV.MatType;
    CV_16UC4: OpenCV.MatType;
    CV_16S: OpenCV.MatType;
    CV_16SC1: OpenCV.MatType;
    CV_16SC2: OpenCV.MatType;
    CV_16SC3: OpenCV.MatType;
    CV_16SC4: OpenCV.MatType;
    CV_32S: OpenCV.MatType;
    CV_32SC1: OpenCV.MatType;
    CV_32SC2: OpenCV.MatType;
    CV_32SC3: OpenCV.MatType;
    CV_32SC4: OpenCV.MatType;
    CV_32F: OpenCV.MatType;
    CV_32FC1: OpenCV.MatType;
    CV_32FC2: OpenCV.MatType;
    CV_32FC3: OpenCV.MatType;
    CV_32FC4: OpenCV.MatType;
    CV_64F: OpenCV.MatType;
    CV_64FC1: OpenCV.MatType;
    CV_64FC2: OpenCV.MatType;
    CV_64FC3: OpenCV.MatType;
    CV_64FC4: OpenCV.MatType;

    COLORMAP_AUTUMN: number
    COLORMAP_BONE: number
    COLORMAP_CIVIDIS: number
    COLORMAP_COOL: number
    COLORMAP_DEEPGREEN: number
    COLORMAP_HOT: number
    COLORMAP_HSV: number
    COLORMAP_INFERNO: number
    COLORMAP_JET: number
    COLORMAP_MAGMA: number
    COLORMAP_OCEAN: number
    COLORMAP_PARULA: number
    COLORMAP_PINK: number
    COLORMAP_PLASMA: number
    COLORMAP_RAINBOW: number
    COLORMAP_SPRING: number
    COLORMAP_SUMMER: number
    COLORMAP_TURBO: number
    COLORMAP_TWILIGHT: number
    COLORMAP_TWILIGHT_SHIFTED: number
    COLORMAP_VIRIDIS: number
    COLORMAP_WINTER: number
    COLOR_BGR2BGR555: number
    COLOR_BGR2BGR565: number
    COLOR_BGR2BGRA: number
    COLOR_BGR2GRAY: number
    COLOR_BGR2HLS: number
    COLOR_BGR2HLS_FULL: number
    COLOR_BGR2HSV: number
    COLOR_BGR2HSV_FULL: number
    COLOR_BGR2Lab: number
    COLOR_BGR2Luv: number
    COLOR_BGR2RGB: number
    COLOR_BGR2RGBA: number
    COLOR_BGR2XYZ: number
    COLOR_BGR2YCrCb: number
    COLOR_BGR2YUV: number
    COLOR_BGR2YUV_I420: number
    COLOR_BGR2YUV_IYUV: number
    COLOR_BGR2YUV_YV12: number
    COLOR_BGR5552BGR: number
    COLOR_BGR5552BGRA: number
    COLOR_BGR5552GRAY: number
    COLOR_BGR5552RGB: number
    COLOR_BGR5552RGBA: number
    COLOR_BGR5652BGR: number
    COLOR_BGR5652BGRA: number
    COLOR_BGR5652GRAY: number
    COLOR_BGR5652RGB: number
    COLOR_BGR5652RGBA: number
    COLOR_BGRA2BGR: number
    COLOR_BGRA2BGR555: number
    COLOR_BGRA2BGR565: number
    COLOR_BGRA2GRAY: number
    COLOR_BGRA2RGB: number
    COLOR_BGRA2RGBA: number
    COLOR_BGRA2YUV_I420: number
    COLOR_BGRA2YUV_IYUV: number
    COLOR_BGRA2YUV_YV12: number
    COLOR_BayerBG2BGR: number
    COLOR_BayerBG2BGRA: number
    COLOR_BayerBG2BGR_EA: number
    COLOR_BayerBG2BGR_VNG: number
    COLOR_BayerBG2GRAY: number
    COLOR_BayerBG2RGB: number
    COLOR_BayerBG2RGBA: number
    COLOR_BayerBG2RGB_EA: number
    COLOR_BayerBG2RGB_VNG: number
    COLOR_BayerBGGR2BGR: number
    COLOR_BayerBGGR2BGRA: number
    COLOR_BayerBGGR2BGR_EA: number
    COLOR_BayerBGGR2BGR_VNG: number
    COLOR_BayerBGGR2GRAY: number
    COLOR_BayerBGGR2RGB: number
    COLOR_BayerBGGR2RGBA: number
    COLOR_BayerBGGR2RGB_EA: number
    COLOR_BayerBGGR2RGB_VNG: number
    COLOR_BayerGB2BGR: number
    COLOR_BayerGB2BGRA: number
    COLOR_BayerGB2BGR_EA: number
    COLOR_BayerGB2BGR_VNG: number
    COLOR_BayerGB2GRAY: number
    COLOR_BayerGB2RGB: number
    COLOR_BayerGB2RGBA: number
    COLOR_BayerGB2RGB_EA: number
    COLOR_BayerGB2RGB_VNG: number
    COLOR_BayerGBRG2BGR: number
    COLOR_BayerGBRG2BGRA: number
    COLOR_BayerGBRG2BGR_EA: number
    COLOR_BayerGBRG2BGR_VNG: number
    COLOR_BayerGBRG2GRAY: number
    COLOR_BayerGBRG2RGB: number
    COLOR_BayerGBRG2RGBA: number
    COLOR_BayerGBRG2RGB_EA: number
    COLOR_BayerGBRG2RGB_VNG: number
    COLOR_BayerGR2BGR: number
    COLOR_BayerGR2BGRA: number
    COLOR_BayerGR2BGR_EA: number
    COLOR_BayerGR2BGR_VNG: number
    COLOR_BayerGR2GRAY: number
    COLOR_BayerGR2RGB: number
    COLOR_BayerGR2RGBA: number
    COLOR_BayerGR2RGB_EA: number
    COLOR_BayerGR2RGB_VNG: number
    COLOR_BayerGRBG2BGR: number
    COLOR_BayerGRBG2BGRA: number
    COLOR_BayerGRBG2BGR_EA: number
    COLOR_BayerGRBG2BGR_VNG: number
    COLOR_BayerGRBG2GRAY: number
    COLOR_BayerGRBG2RGB: number
    COLOR_BayerGRBG2RGBA: number
    COLOR_BayerGRBG2RGB_EA: number
    COLOR_BayerGRBG2RGB_VNG: number
    COLOR_BayerRG2BGR: number
    COLOR_BayerRG2BGRA: number
    COLOR_BayerRG2BGR_EA: number
    COLOR_BayerRG2BGR_VNG: number
    COLOR_BayerRG2GRAY: number
    COLOR_BayerRG2RGB: number
    COLOR_BayerRG2RGBA: number
    COLOR_BayerRG2RGB_EA: number
    COLOR_BayerRG2RGB_VNG: number
    COLOR_BayerRGGB2BGR: number
    COLOR_BayerRGGB2BGRA: number
    COLOR_BayerRGGB2BGR_EA: number
    COLOR_BayerRGGB2BGR_VNG: number
    COLOR_BayerRGGB2GRAY: number
    COLOR_BayerRGGB2RGB: number
    COLOR_BayerRGGB2RGBA: number
    COLOR_BayerRGGB2RGB_EA: number
    COLOR_BayerRGGB2RGB_VNG: number
    COLOR_COLORCVT_MAX: number
    COLOR_GRAY2BGR: number
    COLOR_GRAY2BGR555: number
    COLOR_GRAY2BGR565: number
    COLOR_GRAY2BGRA: number
    COLOR_GRAY2RGB: number
    COLOR_GRAY2RGBA: number
    COLOR_HLS2BGR: number
    COLOR_HLS2BGR_FULL: number
    COLOR_HLS2RGB: number
    COLOR_HLS2RGB_FULL: number
    COLOR_HSV2BGR: number
    COLOR_HSV2BGR_FULL: number
    COLOR_HSV2RGB: number
    COLOR_HSV2RGB_FULL: number
    COLOR_LBGR2Lab: number
    COLOR_LBGR2Luv: number
    COLOR_LRGB2Lab: number
    COLOR_LRGB2Luv: number
    COLOR_Lab2BGR: number
    COLOR_Lab2LBGR: number
    COLOR_Lab2LRGB: number
    COLOR_Lab2RGB: number
    COLOR_Luv2BGR: number
    COLOR_Luv2LBGR: number
    COLOR_Luv2LRGB: number
    COLOR_Luv2RGB: number
    COLOR_RGB2BGR: number
    COLOR_RGB2BGR555: number
    COLOR_RGB2BGR565: number
    COLOR_RGB2BGRA: number
    COLOR_RGB2GRAY: number
    COLOR_RGB2HLS: number
    COLOR_RGB2HLS_FULL: number
    COLOR_RGB2HSV: number
    COLOR_RGB2HSV_FULL: number
    COLOR_RGB2Lab: number
    COLOR_RGB2Luv: number
    COLOR_RGB2RGBA: number
    COLOR_RGB2XYZ: number
    COLOR_RGB2YCrCb: number
    COLOR_RGB2YUV: number
    COLOR_RGB2YUV_I420: number
    COLOR_RGB2YUV_IYUV: number
    COLOR_RGB2YUV_YV12: number
    COLOR_RGBA2BGR: number
    COLOR_RGBA2BGR555: number
    COLOR_RGBA2BGR565: number
    COLOR_RGBA2BGRA: number
    COLOR_RGBA2GRAY: number
    COLOR_RGBA2RGB: number
    COLOR_RGBA2YUV_I420: number
    COLOR_RGBA2YUV_IYUV: number
    COLOR_RGBA2YUV_YV12: number
    COLOR_RGBA2mRGBA: number
    COLOR_XYZ2BGR: number
    COLOR_XYZ2RGB: number
    COLOR_YCrCb2BGR: number
    COLOR_YCrCb2RGB: number
    COLOR_YUV2BGR: number
    COLOR_YUV2BGRA_I420: number
    COLOR_YUV2BGRA_IYUV: number
    COLOR_YUV2BGRA_NV12: number
    COLOR_YUV2BGRA_NV21: number
    COLOR_YUV2BGRA_UYNV: number
    COLOR_YUV2BGRA_UYVY: number
    COLOR_YUV2BGRA_Y422: number
    COLOR_YUV2BGRA_YUNV: number
    COLOR_YUV2BGRA_YUY2: number
    COLOR_YUV2BGRA_YUYV: number
    COLOR_YUV2BGRA_YV12: number
    COLOR_YUV2BGRA_YVYU: number
    COLOR_YUV2BGR_I420: number
    COLOR_YUV2BGR_IYUV: number
    COLOR_YUV2BGR_NV12: number
    COLOR_YUV2BGR_NV21: number
    COLOR_YUV2BGR_UYNV: number
    COLOR_YUV2BGR_UYVY: number
    COLOR_YUV2BGR_Y422: number
    COLOR_YUV2BGR_YUNV: number
    COLOR_YUV2BGR_YUY2: number
    COLOR_YUV2BGR_YUYV: number
    COLOR_YUV2BGR_YV12: number
    COLOR_YUV2BGR_YVYU: number
    COLOR_YUV2GRAY_420: number
    COLOR_YUV2GRAY_I420: number
    COLOR_YUV2GRAY_IYUV: number
    COLOR_YUV2GRAY_NV12: number
    COLOR_YUV2GRAY_NV21: number
    COLOR_YUV2GRAY_UYNV: number
    COLOR_YUV2GRAY_UYVY: number
    COLOR_YUV2GRAY_Y422: number
    COLOR_YUV2GRAY_YUNV: number
    COLOR_YUV2GRAY_YUY2: number
    COLOR_YUV2GRAY_YUYV: number
    COLOR_YUV2GRAY_YV12: number
    COLOR_YUV2GRAY_YVYU: number
    COLOR_YUV2RGB: number
    COLOR_YUV2RGBA_I420: number
    COLOR_YUV2RGBA_IYUV: number
    COLOR_YUV2RGBA_NV12: number
    COLOR_YUV2RGBA_NV21: number
    COLOR_YUV2RGBA_UYNV: number
    COLOR_YUV2RGBA_UYVY: number
    COLOR_YUV2RGBA_Y422: number
    COLOR_YUV2RGBA_YUNV: number
    COLOR_YUV2RGBA_YUY2: number
    COLOR_YUV2RGBA_YUYV: number
    COLOR_YUV2RGBA_YV12: number
    COLOR_YUV2RGBA_YVYU: number
    COLOR_YUV2RGB_I420: number
    COLOR_YUV2RGB_IYUV: number
    COLOR_YUV2RGB_NV12: number
    COLOR_YUV2RGB_NV21: number
    COLOR_YUV2RGB_UYNV: number
    COLOR_YUV2RGB_UYVY: number
    COLOR_YUV2RGB_Y422: number
    COLOR_YUV2RGB_YUNV: number
    COLOR_YUV2RGB_YUY2: number
    COLOR_YUV2RGB_YUYV: number
    COLOR_YUV2RGB_YV12: number
    COLOR_YUV2RGB_YVYU: number
    COLOR_YUV420p2BGR: number
    COLOR_YUV420p2BGRA: number
    COLOR_YUV420p2GRAY: number
    COLOR_YUV420p2RGB: number
    COLOR_YUV420p2RGBA: number
    COLOR_YUV420sp2BGR: number
    COLOR_YUV420sp2BGRA: number
    COLOR_YUV420sp2GRAY: number
    COLOR_YUV420sp2RGB: number
    COLOR_YUV420sp2RGBA: number
    COLOR_mRGBA2RGBA: number

    FONT_HERSHEY_COMPLEX: number
    FONT_HERSHEY_COMPLEX_SMALL: number
    FONT_HERSHEY_DUPLEX: number
    FONT_HERSHEY_PLAIN: number
    FONT_HERSHEY_SCRIPT_COMPLEX: number
    FONT_HERSHEY_SCRIPT_SIMPLEX: number
    FONT_HERSHEY_SIMPLEX: number
    FONT_HERSHEY_TRIPLEX: number
    FONT_ITALIC: number

    DICT_4X4_100: number
    DICT_4X4_1000: number
    DICT_4X4_250: number
    DICT_4X4_50: number
    DICT_5X5_100: number
    DICT_5X5_1000: number
    DICT_5X5_250: number
    DICT_5X5_50: number
    DICT_6X6_100: number
    DICT_6X6_1000: number
    DICT_6X6_250: number
    DICT_6X6_50: number
    DICT_7X7_100: number
    DICT_7X7_1000: number
    DICT_7X7_250: number
    DICT_7X7_50: number
    DICT_APRILTAG_16h5: number
    DICT_APRILTAG_25h9: number
    DICT_APRILTAG_36h10: number
    DICT_APRILTAG_36h11: number
    DICT_ARUCO_ORIGINAL: number

    imshow: (canvas: string | HTMLCanvasElement, mat: OpenCV.Mat) => void
    cvtColor: (src: OpenCV.Mat, dst: OpenCV.Mat, format: number) => void

    // Mat Operations
    mean(src: OpenCV.Mat): OpenCV.Scalar
    matFromImageData(data: Uint8ClampedArray): OpenCV.Mat;
    matFromArray(rows: number, cols: number, type: OpenCV.MatType, array: number[]): OpenCV.Mat

    // ArUco
    detectMarkers(img: OpenCV.Mat, dict: OpenCV.ArucoDictionary, detectedCorners: OpenCV.MatVector, detectedIds: OpenCV.Mat): void
    drawDetectedMarkers(dst: OpenCV.Mat, detectedCorners: OpenCV.MatVector, detectedIds: OpenCV.Mat): void
    calibrateCameraCharuco(charucoCorners: OpenCV.MatVector, charucoIds: OpenCV.MatVector, board: OpenCV.CharucoBoard, imgSize: OpenCV.Size, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat): void
    estimatePoseCharucoBoard(charucoCorners: OpenCV.MatVector, charucoIds: OpenCV.MatVector, board: OpenCV.CharucoBoard, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat, rvec: OpenCV.Mat, tvec: OpenCV.Mat): void
    interpolateCornersCharuco(markerCorners: OpenCV.MatVector, markerIds: OpenCV.Mat, img: OpenCV.Mat, board: OpenCV.CharucoBoard, charucoCorners: OpenCV.Mat, charucoIds: OpenCV.Mat): void
    interpolateCornersCharuco(markerCorners: OpenCV.MatVector, markerIds: OpenCV.Mat, img: OpenCV.Mat, board: OpenCV.CharucoBoard, charucoCorners: OpenCV.Mat, charucoIds: OpenCV.Mat, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat): void
    interpolateCornersCharuco(markerCorners: OpenCV.MatVector, markerIds: OpenCV.Mat, img: OpenCV.Mat, board: OpenCV.CharucoBoard, charucoCorners: OpenCV.Mat, charucoIds: OpenCV.Mat, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat, options: number): void
    drawDetectedCornersCharuco(dst: OpenCV.Mat, corners: OpenCV.Mat): void;
    drawDetectedCornersCharuco(dst: OpenCV.Mat, corners: OpenCV.Mat, cornerIds: OpenCV.Mat): void;
    drawDetectedCornersCharuco(dst: OpenCV.Mat, corners: OpenCV.Mat, cornerIds: OpenCV.Mat, color: OpenCV.Scalar): void;
    estimatePoseSingleMarkers(corners: OpenCV.MatVector, markerLength: number, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat, rvecs: OpenCV.Mat, tvecs: OpenCV.Mat): void
    estimatePoseBoard(corners: OpenCV.MatVector, ids: OpenCV.Mat, board: OpenCV.ArucoBoard, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat, rvec: OpenCV.Mat, tvec: OpenCV.Mat): number
    drawFrameAxes(dst: OpenCV.Mat, cameraMatrix: OpenCV.Mat, distCoeffs: OpenCV.Mat, rvec: OpenCV.Mat, tvec: OpenCV.Mat, axisLength: number): void

    // Drawing
    line(img: OpenCV.Mat, start: OpenCV.Point, end: OpenCV.Point, color: OpenCV.Scalar): void
    line(img: OpenCV.Mat, start: OpenCV.Point, end: OpenCV.Point, color: OpenCV.Scalar, thickness: number): void
    circle(img: OpenCV.Mat, center: OpenCV.Point, radius: number, color: OpenCV.Scalar): void
    circle(img: OpenCV.Mat, center: OpenCV.Point, radius: number, color: OpenCV.Scalar, thickness: number): void
    rectangle(img: OpenCV.Mat, start: OpenCV.Point, end: OpenCV.Point, color: OpenCV.Scalar): void
    rectangle(img: OpenCV.Mat, start: OpenCV.Point, end: OpenCV.Point, color: OpenCV.Scalar, thickness: number): void
    putText: (mat: OpenCV.Mat, text: string, origin: OpenCV.Point, font: number, fontSize: number, color: OpenCV.Scalar, thickness: number, options: number) => void,

    [other: string | number | symbol]: any
}

export async function load_opencv(): Promise<OpenCV> {
    return await cv() as OpenCV;
}

export function forEachMatVector(mv: OpenCV.MatVector, fnc: (item: any)=>void) {
    for (var size = 0; size < mv.size(); size++) {
        fnc(mv.get(size))
    }
}

type OpenCVFrameHandler = (cv: OpenCV, src: OpenCV.Mat, dst: OpenCV.Mat) => void
export class OpenCVRenderer {
    private cv: OpenCV
    private video: HTMLVideoElement
    private outputCanvas: HTMLCanvasElement
    private src: OpenCV.Mat;
    private dst: OpenCV.Mat;
    private width: number = 0;
    private height: number = 0;
    private scale: number = 1;
    private fps: number = 30;
    private handler: OpenCVFrameHandler | undefined = undefined
    private nextRenderTime: number = 0;
    private frame: number = -1

    constructor(cv: OpenCV, video: HTMLVideoElement, outputCanvas: HTMLCanvasElement) {
        this.cv = cv;
        this.video = video;
        this.outputCanvas = outputCanvas;
        this.src = new cv.Mat();
        this.dst = new cv.Mat();
    }

    getCV(): OpenCV {
        return this.cv
    }

    static async getAvailableCameras() {
        // Get available devices
        let devices = await navigator.mediaDevices.enumerateDevices()

        // Filter for camera devices
        let cameras = devices.filter(dev => dev.kind === "videoinput");

        return cameras;
    }

    async requestCamera(deviceId?: string) {
        if (this.video.srcObject instanceof MediaStream) {
            let camera = this.video.srcObject as MediaStream
            console.log("Stopping prev camera...")
            camera.getTracks().forEach(track => {
                track.stop()
            })
        }

        // Attempt to get the camera.
        let camera = await navigator.mediaDevices.getUserMedia(
            {video: deviceId ? {deviceId: deviceId} : true, audio: false}
        )
        
        // Get dimensions of the camera
        let settings = camera.getVideoTracks()[0].getSettings();
        this.width = settings.width!;
        this.height = settings.height!;

        // Create mats from camera
        this.src = new this.cv.Mat(this.height, this.width, this.cv.CV_8UC4);
        this.dst = new this.cv.Mat(this.height, this.width, this.cv.CV_8UC4);

        console.log(`Using camera with dimensions ${this.width}x${this.height}`)
        this.video.srcObject = camera;
        this.video.play();
    }

    start() {
        if (this.frame == -1)
            this.render();
     }

    stop() {
        cancelAnimationFrame(this.frame)
        this.frame = -1
    }

    size(): OpenCV.Size {
        return {
            width: this.width,
            height: this.height
        }
    }

    onNewFrame(handler: OpenCVFrameHandler) {
        this.handler = handler;
    }
 
    setFPS(fps: number) {
        this.fps = fps;
    }

    private render() {
        // Check if a frame can be rendered by seeing if we have exceeded the
        // next render time, which is the last frame time plus the requested
        // framerate.
        let readyToRender = Date.now() >= this.nextRenderTime && this.video != null && this.outputCanvas != null
        if (readyToRender) {
            let context = this.outputCanvas.getContext("2d");
            if (!context) return;

            // Draw the current video frame on the canvas
            context.drawImage(this.video,0,0,this.width,this.height);

            // Update the src Mat with the image data
            try {
                let imageData = context.getImageData(0,0,this.width,this.height).data;
                this.src.data.set(imageData);
            } catch {
                console.warn("can't get image data!")
            }

            // process the image, if a handler exists.
            if (this.handler)
                this.handler(this.cv, this.src, this.dst)
            
            this.cv.imshow(this.outputCanvas, this.dst);
            this.nextRenderTime = Date.now() + (1000/this.fps);
        }

        // Queue a new animation frame
        this.frame = requestAnimationFrame(() => this.render.bind(this)());
    
    }

}