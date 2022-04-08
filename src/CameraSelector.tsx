import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react"
import { OpenCVRenderer } from "./opencv"

interface CameraSelectorDialogProps {
    open: boolean,
    cameraDeviceId: string | undefined,
    onNewCamera(deviceId: string): void, 
    onClose(): void,
}

export const CameraSelectorDialog: React.FC<CameraSelectorDialogProps> = ({open, cameraDeviceId, onNewCamera, onClose}) => {
    const [ availableCameras, setAvailableCameras ] = useState<MediaDeviceInfo[]>([])
    const [ selectedId, setSelectedId ] = useState(cameraDeviceId);

    // Get available cameras
    useEffect(() => {
        OpenCVRenderer.getAvailableCameras().then(cameras => setAvailableCameras(cameras))
    }, [])

    // Change the selected camera in the menu when its successfully changed by
    // the parent.
    useEffect(() => {
        setSelectedId(cameraDeviceId);
    }, [cameraDeviceId])

    /**
     * Closes the dialog and saves the camera selection if specified.
     */
    function close(save: boolean) {
        if (save && selectedId)
            onNewCamera(selectedId)
        
        onClose()
    }
    
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Select a Camera</DialogTitle>
        <DialogContent>
            <RadioGroup
                value={selectedId}
                onChange={(e, value) => {
                    setSelectedId(value)
                }}
            >
                {availableCameras.map(camera => 
                    <FormControlLabel key={camera.deviceId} value={camera.deviceId} control={<Radio />} label={camera.label} />
                )}
            </RadioGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => close(false)}>Cancel</Button>
            <Button onClick={() => close(true)}>Select</Button>
        </DialogActions>
    </Dialog>
}