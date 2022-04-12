import { OpenCVRenderer, Colors, forEachMatVector, OpenCV } from "./opencv";
import CubeTracker from "./trackers/cube_tracker.json"

export enum WebtrackMode { CALIBRATE, MARKERS, BOARD }

export interface WebtrackSettings {
    drawMarkers: boolean
    mode: WebtrackMode
    capturing: boolean
    cameraMatrix: number[] | undefined
    distCoeffs: number[] | undefined
}

interface Tracker {
    name: string,
    markers: {
        [ key: string ]: number[][]
    }
}

var x = 0

/**
 * Creates and returns OpenCV Aruco Board given a Tracker file format.
 * 
 * @param cv OpenCV instance
 * @param tracker The tracker format
 * @param dictionary The dictionary to use
 * @returns The created Board
 */
function trackerToBoard(cv: OpenCV, tracker: Tracker, dictionary: OpenCV.ArucoDictionary) {
    // Get marker information
    let markerKeys = Object.keys(tracker.markers)
    let markerIds = markerKeys.map(mStr => parseInt(mStr))
    
    // Create OpenCV data
    let markerCornersVector = new cv.MatVector()
    let markerIdMat = cv.matFromArray(1, markerIds.length, cv.CV_32S, markerIds)
    
    markerIds.forEach(markerId => {
        // Need to flatten the marker array from an array of Vector3's into a
        // one-dimensional array of X,Y,Z,X,Y,Z...
        let markerArray = tracker.markers[markerId].flat()

        // Create corner matrix
        let cornerMat = cv.matFromArray(1, 4, cv.CV_32FC3, markerArray)

        // Push corner matrix to MatVector
        markerCornersVector.push_back(cornerMat)
    })

    return new cv.aruco_Board(markerCornersVector, dictionary, markerIdMat)
}

type CameraCalibrationHandler = (cameraMatrix: number[], distCoeffs: number[]) => void
type BoardPoseCountHandler = (poseCount: number) => void

export class WebtrackCV {
    /**
     * Renderer that handles the webcam and outputs to the webpage
     */
    renderer: OpenCVRenderer

    /** 
     * ArUco Dictionary to use. This contains all the marker patterns to be used
     * in tracking
     */
    dict: OpenCV.ArucoDictionary

    /**
     * All found marker corners within the current image.
     */
    markerCorners: OpenCV.MatVector

    /**
     * All found marker IDs within the current image
     */
    markerIds: OpenCV.Mat

    /**
     * The CharucoBoard used for calibration
     */
    calibrationBoard: OpenCV.CharucoBoard

    /**
     * A list of CharucoBoard corners to be used for calibration. Every element of this
     * vector contains all corners found within a capture
     */
    allCharucoCorners: OpenCV.MatVector

    /**
     * A list of CharucoBoard ids to be used for calibration. Every element of this
     * vector contains all ids found within a capture
     */
    allCharucoIds: OpenCV.MatVector

    /**
     * All CharucoBoard corners within the current image
     */
    charucoCorners: OpenCV.Mat

    /**
     * All CharucoBoard IDs within the current image
     */
    charucoIds: OpenCV.Mat

    /**
     * The current image in grayscale
     */
    gray: OpenCV.Mat

    /**
     * Settings to use during processing
     */
    settings: WebtrackSettings

    /**
     * Camera calibration matrix. Needs to be calibrated before use
     */
    cameraMatrix: OpenCV.Mat;

    /**
     * Distortion coefficients matrix
     */
    distCoeffs: OpenCV.Mat;

    /**
     * Stores whether the camera has been calibrated
     */
    calibrated = false

    /**
     * All rotation vectors of markers within the current image
     */
    rvecs: OpenCV.Mat

    /**
     * All translation vectors of markers within the current image
     */
    tvecs: OpenCV.Mat
    
    /**
     * The translation vector of the tracker within the current image (if found)
     */
    trackerTvec: OpenCV.Mat

    /**
     * The rotation vector of the tracker within the current image (if found)
     */
    trackerRvec: OpenCV.Mat

    /**
     * An Aruco Board that represents a tracker.
     */
    tracker: OpenCV.ArucoBoard

    newCameraCalibrationHandler: CameraCalibrationHandler | undefined
    newBoardPoseCountHandler: BoardPoseCountHandler | undefined

    constructor(renderer: OpenCVRenderer, settings: WebtrackSettings) {
        this.renderer = renderer;
        let cv = renderer.getCV()
        this.settings = settings

        // Setup Mats and MatVectors
        this.dict = new cv.aruco_Dictionary(cv.DICT_4X4_1000)
        this.markerCorners = new cv.MatVector();
        this.markerIds = new cv.Mat();
        this.calibrationBoard = new cv.aruco_CharucoBoard(5, 7, 37.4/1000, (37.4)*(4/5)/1000, this.dict);
        this.tracker = trackerToBoard(cv, CubeTracker as Tracker, this.dict)
        this.allCharucoCorners = new cv.MatVector();
        this.allCharucoIds = new cv.MatVector();
        this.charucoCorners = new cv.Mat();
        this.charucoIds = new cv.Mat();
        this.gray = new cv.Mat();
        this.rvecs = new cv.Mat()
        this.tvecs = new cv.Mat()
        this.trackerTvec = new cv.Mat()
        this.trackerRvec = new cv.Mat()
        this.renderer.onNewFrame(this.onNewFrame.bind(this))

        this.cameraMatrix = new cv.Mat();
        this.distCoeffs = new cv.Mat();

        // A redundant operation in some cases since it will recreate the camera
        // and distortion coefficient matrices, but TypeScript yells if you don't
        // definitely initialize them in the constructor, so whatever.
        this.applySettings(settings)
    }

    /**
     * Applies settings to change image processing behavior
     * 
     * @param settings 
     */
    applySettings(settings: WebtrackSettings) {
        this.settings = settings;
        let cv = this.renderer.getCV()
        if (settings.cameraMatrix != undefined && settings.distCoeffs != undefined) {
            this.cameraMatrix = cv.matFromArray(3,3,cv.CV_64F,settings.cameraMatrix)
            this.distCoeffs = cv.matFromArray(1,5,cv.CV_64F,settings.distCoeffs)
            this.calibrated = true
        }
    }

    /**
     * Clears all calibration board poses stored
     */
    clearCalibrationBoards() {
        this.allCharucoCorners.delete()
        this.allCharucoIds.delete()
        this.allCharucoCorners = new (this.renderer.getCV().MatVector)()
        this.allCharucoIds = new (this.renderer.getCV().MatVector)()
        if (this.newBoardPoseCountHandler)
            this.newBoardPoseCountHandler(0)
    }

    /**
     * Captures the current calibration board pose from the current frame. 
     * 
     * @returns Whether capture was successful
     */
    captureCalibrationBoard(): boolean {
        if (this.markerCorners.size() > 0) {
            this.allCharucoCorners.push_back(this.charucoCorners)
            this.allCharucoIds.push_back(this.charucoIds)

            if (this.newBoardPoseCountHandler)
                this.newBoardPoseCountHandler(this.allCharucoCorners.size())

            return true
        }

        return false
    }

    /**
     * Attempts calibration using the stored board poses. If an error occurred,
     * an alert will be displayed to the user.
     */
    calibrate() {
        if (this.allCharucoCorners.size() > 0) {
            let cv = this.renderer.getCV()
            try {
                cv.calibrateCameraCharuco(this.allCharucoCorners, this.allCharucoIds, this.calibrationBoard, this.renderer.size(), this.cameraMatrix, this.distCoeffs)
                this.calibrated = true
                if (this.newCameraCalibrationHandler)
                    this.newCameraCalibrationHandler(
                        WebtrackCV.flattenMatrix(this.cameraMatrix, "double"), 
                        WebtrackCV.flattenMatrix(this.distCoeffs, "double"))

            } catch {
                alert("Error calibrating. Please try again with new board positions.")
                this.clearCalibrationBoards()
            }
        }
    }

    onNewCameraCalibration(handler: CameraCalibrationHandler) {
        this.newCameraCalibrationHandler = handler
    }

    onNewBoardPoseCountHandler(handler: BoardPoseCountHandler) {
        this.newBoardPoseCountHandler = handler;
    }



    static flattenMatrix(mat: OpenCV.Mat, type: "int" | "float" | "double"): number[] {
        var methodStr: keyof OpenCV.Mat
        switch (type) {
            case "int":
                methodStr = "intAt";
                break;
            
            case "float":
                methodStr = "floatAt";
                break;

            case "double":
                methodStr = "doubleAt"
                break;
        }
        let flattenedMatrix: number[] = []
        for (var r = 0; r < mat.rows; r++) {
            for (var c = 0; c < mat.cols; c++) {
                flattenedMatrix.push(mat[methodStr](r,c))
            }
        }

        return flattenedMatrix
    }

    /**
     * Called every time there is a new frame from the camera.
     * 
     * @param cv OpenCV instance
     * @param src Input image
     * @param dst Output image to be displayed on webpage
     */
    private onNewFrame(cv: OpenCV, src: OpenCV.Mat, dst: OpenCV.Mat) {
        // Convert src image to gray-mat and to a RGB destination mat
        cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB)
        cv.cvtColor(dst, this.gray, cv.COLOR_RGB2GRAY)

        // cv.circle(dst, {x: dst.cols/2, y: dst.rows/2}, 5, Colors.GREEN, 10)

        // Detect markers on gray image (doesn't matter if calibrated)
        cv.detectMarkers(this.gray, this.dict, this.markerCorners, this.markerIds)

        // Draw the markers on the output image
        cv.drawDetectedMarkers(dst, this.markerCorners, this.markerIds)

        if (!this.calibrated) {
            // Camera is NOT calibrated, so find and draw Charuco calibration boards

            // You MUST have some markers to work with in order to interpolate corners
            // Otherwise, the interpolate function will cause the program to crash.
            if (this.markerCorners.size() > 0) {
                cv.interpolateCornersCharuco(this.markerCorners, this.markerIds, this.gray, this.calibrationBoard, this.charucoCorners, this.charucoIds);
                if (this.charucoIds.rows > 0) {
                    cv.drawDetectedCornersCharuco(dst, this.charucoCorners, this.charucoIds, Colors.MAGENTA);
                    const boardAvg = cv.mean(this.charucoCorners)
                    cv.circle(dst, {x:boardAvg[0],y:boardAvg[1]}, 10, Colors.YELLOW, 2)
                }
            }
        } else {
            // Draw detected markers if some are present within the image
            if (this.markerCorners.size() > 0) {
                cv.estimatePoseSingleMarkers(this.markerCorners, 12, this.cameraMatrix, this.distCoeffs, this.rvecs, this.tvecs)
                
                // Draw each marker detected
                for (var i = 0; i < this.markerCorners.size(); i++)
                    cv.drawFrameAxes(dst, this.cameraMatrix, this.distCoeffs, this.rvecs.row(i), this.tvecs.row(i), 12)

                // Attempt to locate a board tracker, and if it is found, draw
                // its position and orientation.
                let result = cv.estimatePoseBoard(this.markerCorners, this.markerIds, this.tracker, this.cameraMatrix, this.distCoeffs, this.trackerRvec, this.trackerTvec)
                if (result != 0)
                    cv.drawFrameAxes(dst, this.cameraMatrix, this.distCoeffs, this.trackerRvec, this.trackerTvec, 0.1)
            }
        }
    }
}