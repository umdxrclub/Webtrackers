import { Box, Button, Paper, Switch, Typography } from "@mui/material";
import { createRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CameraSelectorDialog } from "./CameraSelector";
import { load_opencv, OpenCV, OpenCVRenderer } from "./opencv";
import { WebtrackCV, WebtrackMode, WebtrackSettings } from "./tracker";

export const Webtrack: React.FC = ({}) => {
    // Div Elements
    const video = createRef<HTMLVideoElement>();
    const canvas = createRef<HTMLCanvasElement>();
    
    const cv = useRef<OpenCV>();
    const renderer = useRef<OpenCVRenderer>();
    const webtrackCv = useRef<WebtrackCV>();
    
    // State
    const [ cameraDeviceId, setCameraDeviceId ] = useState<string | undefined>();
    const [ cameraSelectorOpen, setCameraSelectorOpen ] = useState(false);
    const [ capturedBoardPoses, setCapturedBoardPoses ] = useState(0)
    const [ settings, setSettings ] = useState<WebtrackSettings>({
        drawMarkers: true,
        mode: WebtrackMode.MARKERS,
        capturing: true,
        cameraMatrix: undefined,
        distCoeffs: undefined
    })

    // Update the renderer's capture state once the "capturing" state variable
    // changes its value.
    useEffect(() => {
        if (settings.capturing)
            renderer.current?.start()
        else
            renderer.current?.stop()
    }, [settings])

    // Update the renderer's camera when a new camera device id is selected
    useEffect(() => {
        if (cameraDeviceId && renderer.current) {
            renderer.current.requestCamera(cameraDeviceId).then(() => {
                setSettings(prev => { return {...prev, capturing: true }})
            }).catch((e) => {
                console.error(e)
                alert("That camera could not be started!")
            });
        }
    }, [cameraDeviceId])

    // Update settings when necessary
    useEffect(() => {
        if (webtrackCv.current)
            webtrackCv.current.applySettings(settings)
    }, [settings])

    // Upon loading the Webtrack component, 
    useLayoutEffect(() => {
        let vid = video.current!
        let outputCanvas = canvas.current!
        var cvRenderer: OpenCVRenderer
        // Load OpenCV
        load_opencv().then(async loadedCv => {
            // Store the loaded OpenCV
            cv.current = loadedCv;

            // Create an OpenCV renderer
            cvRenderer = new OpenCVRenderer(loadedCv, vid, outputCanvas)
            renderer.current = cvRenderer;
            webtrackCv.current = new WebtrackCV(cvRenderer, settings)
            webtrackCv.current.onNewCameraCalibration((cam, dist) => {
                setSettings(prev => { return {
                    ...prev,
                    cameraMatrix: cam,
                    distCoeffs: dist
                }})
            })

            webtrackCv.current.onNewBoardPoseCountHandler(count => setCapturedBoardPoses(count))

            // Load first camera available
            OpenCVRenderer.getAvailableCameras().then(cameras => {
                if (cameras.length > 0) {
                    setCameraDeviceId(cameras[0].deviceId);
                } else {
                    alert("No webcam devices found!");
                }
            })

            setCapturedBoardPoses(0)
        });

        return () => {
            cvRenderer.stop()
            renderer.current = undefined
            setCameraDeviceId(undefined)
        }
    }, []);

    return <Paper sx={{flexDirection: "vertical", justifyContent: "center"}}>
        <CameraSelectorDialog
            open={cameraSelectorOpen}
            cameraDeviceId={cameraDeviceId}
            onNewCamera={camera => setCameraDeviceId(camera)}
            onClose={() => setCameraSelectorOpen(false)}
        />

        { /* Hidden video player to get camera stream */ }
        <video ref={video} hidden />
        <Box display="flex" justifyContent="center" alignItems="center">
            <canvas ref={canvas} />
        </Box>
        
        <Switch checked={settings.capturing} onChange={event => setSettings(prev => { return {...prev, capturing: event.target.checked}})} />
        <Button onClick={() => setCameraSelectorOpen(true)}>Select Camera</Button>
        <Button disabled={settings.cameraMatrix != undefined} onClick={() => webtrackCv.current?.captureCalibrationBoard()}>Capture Board Pose</Button>
        <Button disabled={settings.cameraMatrix != undefined || capturedBoardPoses < 10} onClick={() => webtrackCv.current?.calibrate()}>Calibrate Board</Button>
        <Typography>Calibrated: {settings.cameraMatrix != undefined ? "Yes" : `No (${capturedBoardPoses}/10)`}</Typography>
    </Paper>
}