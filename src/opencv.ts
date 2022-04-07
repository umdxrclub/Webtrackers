declare var cv: any;

export declare namespace OpenCV {
    export type MatType = number;

    export class Mat {
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
        static matFromImageData(data: Uint8ClampedArray): Mat;

        clone(): Mat;
        copyTo(dst: Mat): void;
        convertTo(dst: Mat, rtype: number, alpha?: number, beta?: number): void
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

    imshow: (canvas: string | HTMLCanvasElement, mat: OpenCV.Mat) => void
    cvtColor: (src: OpenCV.Mat, dst: OpenCV.Mat, format: number) => void
    putText: (mat: OpenCV.Mat, text: string, origin: OpenCV.Point, font: number, fontSize: number, color: OpenCV.Scalar, thickness: number, options: number) => void,
    [other: string | number | symbol]: any
}

export async function load_opencv(): Promise<OpenCV> {
    return await cv() as OpenCV;
}

type OpenCVFrameHandler = (cv: OpenCV, src: OpenCV.Mat, dst: OpenCV.Mat) => void
export class OpenCVRenderer {
    private cv: OpenCV
    private video: HTMLVideoElement
    private outputCanvas: HTMLCanvasElement
    private rendering: boolean = false
    private src: OpenCV.Mat
    private dst: OpenCV.Mat
    private width: number;
    private height: number;
    private handler: OpenCVFrameHandler | undefined = undefined

    constructor(cv: OpenCV, video: HTMLVideoElement, outputCanvas: HTMLCanvasElement, width: number, height: number) {
        this.cv = cv;
        this.video = video;
        this.outputCanvas = outputCanvas;
        this.width = width;
        this.height = height;
        this.src = new cv.Mat(height, width, cv.CV_8UC4)
        this.dst = new cv.Mat(height, width, cv.CV_8UC4)
    }

    async requestCamera() {
        let camera = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
        this.video.srcObject = camera;
        this.video.play();
    }

    start() {
        if (!this.rendering) {
            this.rendering = true;
            this.render();
        }
     }

    stop() {
        this.rendering = false;
    }

    onNewFrame(handler: OpenCVFrameHandler) {
        this.handler = handler;
    }

    private render() {
        let context = this.outputCanvas.getContext("2d");
        if (!context) return;

        // Draw the current video frame on the canvas
        context.drawImage(this.video,0,0,this.width,this.height);

        // Update the src Mat with the image data
        let imageData = context.getImageData(0,0,this.width,this.height).data;
        this.src.data.set(imageData);

        // process the image, if a handler exists.
        if (this.handler)
            this.handler(this.cv, this.src, this.dst)
        
        this.cv.imshow(this.outputCanvas, this.dst);

        // Queue a new frame if we're still rendering.
        if (this.rendering)
            requestAnimationFrame(() => this.render.bind(this)());
    }

}