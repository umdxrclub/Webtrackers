import { Box, Button, Container, Paper, Switch } from "@mui/material";
import { createRef, useEffect, useRef, useState } from "react";
import { CameraSelectorDialog } from "./CameraSelector";
import { load_opencv, OpenCVRenderer, OpenCV, Colors } from "./opencv";
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
    const [ settings, setSettings ] = useState<WebtrackSettings>({
        drawMarkers: true,
        mode: WebtrackMode.MARKERS,
        capturing: true,
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
        if (cameraDeviceId) {
            renderer.current?.requestCamera(cameraDeviceId).then(() => {
                setSettings({...settings, capturing: true})
            }).catch(() => alert("That camera could not be started!"));
        }
    }, [cameraDeviceId])

    // Update settings when necessary
    useEffect(() => {
        if (webtrackCv.current)
            webtrackCv.current.applySettings(settings)
    }, [settings])

    // Upon loading the Webtrack component, 
    useEffect(() => {
        var cvRenderer: OpenCVRenderer
        // Load OpenCV
        load_opencv().then(async loadedCv => {
            // Store the loaded OpenCV
            cv.current = loadedCv;

            // Create an OpenCV renderer
            cvRenderer = new OpenCVRenderer(loadedCv, video.current!, canvas.current!)
            renderer.current = cvRenderer;
            webtrackCv.current = new WebtrackCV(cvRenderer, settings)

            // Load first camera available
            OpenCVRenderer.getAvailableCameras().then(cameras => {
                if (cameras.length > 0) {
                    setCameraDeviceId(cameras[0].deviceId);
                } else {
                    alert("No webcam devices found!");
                }
            })
        });
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
        <Switch checked={settings.drawMarkers} onChange={event => setSettings(prev => { return {...prev, drawMarkers: event.target.checked}})} />
        <Button onClick={() => setCameraSelectorOpen(true)}>Select Camera</Button>
        <Button onClick={() => webtrackCv.current?.captureCalibrationBoard()}>Capture Board Pose</Button>
        <Button onClick={() => webtrackCv.current?.calibrate()}>Calibrate Board</Button>
    </Paper>
}