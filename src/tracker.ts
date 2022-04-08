import { render } from "@testing-library/react";
import { OpenCV, OpenCVRenderer, Colors, forEachMatVector } from "./opencv";

export enum WebtrackMode { CALIBRATE, MARKERS, BOARD }

export interface WebtrackSettings {
    drawMarkers: boolean
    mode: WebtrackMode
    capturing: boolean
}

export class WebtrackCV {
    renderer: OpenCVRenderer

    dict: OpenCV.ArucoDictionary
    markerCorners: OpenCV.MatVector
    markerIds: OpenCV.Mat
    calibrationBoard: OpenCV.CharucoBoard
    allCharucoCorners: OpenCV.MatVector
    allCharucoIds: OpenCV.MatVector
    charucoCorners: OpenCV.Mat
    charucoIds: OpenCV.Mat
    gray: OpenCV.Mat
    settings: WebtrackSettings
    cameraMatrix: OpenCV.Mat
    distCoeffs: OpenCV.Mat
    calibrated = false
    rvecs: OpenCV.Mat
    tvecs: OpenCV.Mat


    constructor(renderer: OpenCVRenderer, settings: WebtrackSettings) {
        this.renderer = renderer;
        let cv = renderer.getCV()
        this.settings = settings;

        // Setup Mats and MatVectors
        this.dict = new cv.aruco_Dictionary(cv.DICT_4X4_1000)
        this.markerCorners = new cv.MatVector();
        this.markerIds = new cv.Mat();
        this.calibrationBoard = new cv.aruco_CharucoBoard(5, 7, 15, 12, this.dict);
        this.allCharucoCorners = new cv.MatVector();
        this.allCharucoIds = new cv.MatVector();
        this.charucoCorners = new cv.Mat();
        this.charucoIds = new cv.Mat();
        this.gray = new cv.Mat();
        this.cameraMatrix = new cv.Mat();
        this.distCoeffs = new cv.Mat();
        this.rvecs = new cv.Mat()
        this.tvecs = new cv.Mat()
        this.renderer.onNewFrame(this.onNewFrame.bind(this))
    }

    applySettings(settings: WebtrackSettings) {
        this.settings = settings;
    }

    clearCalibrationBoards() {
        this.allCharucoCorners.delete()
        this.allCharucoIds.delete()
        this.allCharucoCorners = new (this.renderer.getCV().MatVector)()
        this.allCharucoIds = new (this.renderer.getCV().MatVector)()
    }

    captureCalibrationBoard(): boolean {
        if (this.markerCorners.size() > 0) {
            this.allCharucoCorners.push_back(this.charucoCorners)
            this.allCharucoIds.push_back(this.charucoIds)
            return true
        }

        return false
    }

    calibrate() {
        if (this.allCharucoCorners.size() > 0) {
            let cv = this.renderer.getCV()
            console.log("calibrate")
            cv.calibrateCameraCharuco(this.allCharucoCorners, this.allCharucoIds, this.calibrationBoard, this.renderer.size(),  this.cameraMatrix, this.distCoeffs)
            console.log("d")
            this.calibrated = true
        }
    }

    private onNewFrame(cv: OpenCV, src: OpenCV.Mat, dst: OpenCV.Mat) {
        let width = src.cols;
        let height = src.rows;

        // Convert src image to gray-mat and to a RGB destination mat
        cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB)
        cv.cvtColor(dst, this.gray, cv.COLOR_RGB2GRAY)

        // Detect markers and obtain gray-mat
        cv.detectMarkers(this.gray, this.dict, this.markerCorners, this.markerIds)

        if (this.markerCorners.size() > 0) {
            cv.interpolateCornersCharuco(this.markerCorners, this.markerIds, this.gray, this.calibrationBoard, this.charucoCorners, this.charucoIds);
            if (this.charucoIds.rows > 0) {
                cv.drawDetectedCornersCharuco(dst, this.charucoCorners, this.charucoIds, Colors.MAGENTA);
                const boardAvg = cv.mean(this.charucoCorners)
                cv.circle(dst, {x:boardAvg[0],y:boardAvg[1]}, 10, Colors.YELLOW, 2)
            }
        }

        forEachMatVector(this.allCharucoCorners, (corners) => {
            const cornersAvg = cv.mean(corners)
            cv.circle(dst, {x:cornersAvg[0],y:cornersAvg[1]}, 10, Colors.GREEN, 2)
        })

        if (this.settings.drawMarkers) {
            cv.drawDetectedMarkers(dst, this.markerCorners, this.markerIds)

            if (this.calibrated && this.markerCorners.size() > 0) {
                cv.estimatePoseSingleMarkers(this.markerCorners, 12, this.cameraMatrix, this.distCoeffs, this.rvecs, this.tvecs)
                
                for (var i = 0; i < this.markerCorners.size(); i++)
                    cv.drawFrameAxes(dst, this.cameraMatrix, this.distCoeffs, this.rvecs.row(i), this.tvecs.row(i), 12)
            }
        }
    }
}