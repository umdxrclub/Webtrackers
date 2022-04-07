import { createRef, useEffect } from "react";
import { load_opencv, OpenCVRenderer } from "./opencv";

const WIDTH = 1600;
const HEIGHT = 900;

export const Webtrack: React.FC = ({}) => {
    const video = createRef<HTMLVideoElement>();
    const canvas = createRef<HTMLCanvasElement>();
    useEffect(() => {
        var cvRenderer: OpenCVRenderer
        // Load OpenCV
        load_opencv().then(async cv => {
            // Create an OpenCV renderer
            cvRenderer = new OpenCVRenderer(cv, video.current!, canvas.current!, WIDTH, HEIGHT)

            // Request camera
            await cvRenderer.requestCamera();

            // Set frame handler
            cvRenderer.onNewFrame((cv, src, dst) => {
                src.copyTo(dst)
                cv.putText(dst, "luke :)", {x: 100, y: 100},
                    cv.FONT_HERSHEY_PLAIN, 4.0, [255,0,0,255], 2, 0)
            })

            // start rendering
            cvRenderer.start();
        });

        return () => {
            // When the React component is cleaned up, stop the renderer
            if (cvRenderer)
                cvRenderer.stop();
        }
    }, []);


    return <div>
        <video ref={video} hidden />
        <canvas ref={canvas} />
    </div>
}