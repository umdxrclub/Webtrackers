import { Box, Button, Container, Paper, Slider, Stack, Switch, Typography } from "@mui/material";
import { render } from "@testing-library/react";
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
    const [ scale, setScale ] = useState(100)
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

    function activateCamera(cameraDeviceId: string) {
        if (renderer.current) {
            renderer.current.requestCamera(cameraDeviceId).then(() => {
                setSettings(prev => { return {...prev, capturing: true }})
            }).catch((e) => {
                console.error(e)
                alert("That camera could not be started!")
            });
        }
    }

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
        if (cameraDeviceId)
            activateCamera(cameraDeviceId)
    }, [cameraDeviceId])

    // Update settings when necessary
    useEffect(() => {
        if (webtrackCv.current)
            webtrackCv.current.applySettings(settings)
    }, [settings])

    // Change scale
    useEffect(() => {
        if (renderer.current)
            renderer.current.setScale(scale/100)
    }, [scale])

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
            cvRenderer.setScale(scale)
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

            if (cameraDeviceId) {
                // Camera already exists, activate it
                activateCamera(cameraDeviceId)
            } else {
                // Find and load first camera available
                OpenCVRenderer.getAvailableCameras().then(cameras => {
                    if (cameras.length > 0) {
                        setCameraDeviceId(cameras[0].deviceId);
                    } else {
                        alert("No webcam devices found!");
                    }
                })
            }

            setCapturedBoardPoses(0)
        });

        return () => {
            cvRenderer.stop()
            renderer.current = undefined
        }
    }, []);

    return <Paper sx={{flexDirection: "vertical", justifyContent: "center", marginTop: 4}}>
        <CameraSelectorDialog
            open={cameraSelectorOpen}
            cameraDeviceId={cameraDeviceId}
            onNewCamera={camera => setCameraDeviceId(camera)}
            onClose={() => setCameraSelectorOpen(false)}
        />

        <Container sx={{textAlign: "center", paddingTop: 2, paddingBottom: 2}}>
            <Typography variant="h2">Webtrackers</Typography>
            <Typography>Developed by the UMD XR Club. It probably works!</Typography>
        </Container>
        <Stack sx={{paddingLeft: 8, paddingRight: 8, paddingBottom: 2}} justifyContent="center" alignItems="center">
            <Switch checked={settings.capturing} onChange={event => setSettings(prev => { return {...prev, capturing: event.target.checked}})} />
            <Button onClick={() => setCameraSelectorOpen(true)}>Select Camera</Button>
            <Button disabled={settings.cameraMatrix != undefined} onClick={() => webtrackCv.current?.captureCalibrationBoard()}>Capture Board Pose</Button>
            <Button disabled={settings.cameraMatrix != undefined || capturedBoardPoses < 10} onClick={() => webtrackCv.current?.calibrate()}>Calibrate Board</Button>
            <Slider aria-label="Image Scale" value={scale} min={1} max={100} defaultValue={100} onChange={(e,v) => setScale(v as number)} />
            <Typography>Calibrated: {settings.cameraMatrix != undefined ? "Yes" : `No (${capturedBoardPoses}/10)`}</Typography>
        </Stack>

        { /* Hidden video player to get camera stream */ }
        <video ref={video} hidden />
        <Box display="flex" justifyContent="center" alignItems="center"> 
            <canvas ref={canvas} style={{marginBottom:8}}/>
        </Box>
    </Paper>
}