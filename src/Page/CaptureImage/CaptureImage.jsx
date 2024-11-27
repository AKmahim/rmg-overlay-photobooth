import { useEffect, useRef, useState } from "react";
import background from "../../assets/qr.png";
// import frame from "../../assets/frame.png"; // 
import frame from "../../assets/frame2.png"; //  
// import frame from "../../assets/frame3.png"; // 1280*720 reposition frame
import { useNavigate } from "react-router-dom";

const CaptureImage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    startCamera();

    // Cleanup to stop the camera when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      captureImage();
    }
  }, [countdown]);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas size to match video
      // canvas.width = videoRef.current.videoWidth;
      // canvas.height = videoRef.current.videoHeight;
    canvas.width = 720;
    canvas.height = 1280;
    console.log(videoRef.current.videoHeight);
    
    console.log('canvas=>' , canvas.width,canvas.height);
    

      // Draw the video frame
    //   context.translate(canvas.width, 0);
    //   context.scale(-1, 1);
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Draw the overlay
      const img = new Image();
      img.src = frame;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        console.log("Captured Image Data URL:", dataURL);
        // Redirect to /preview with the result data
        navigate("/preview", { state: { imageData: dataURL } });
      };
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen relative"
      style={{
        backgroundColor: "#4677ba",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        id="cameraPreview"
        className="relative w-[720px] h-[1280px] border-red-100 border-2"
      >
        {/* Webcam View */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover transform -scale-x-100"
          autoPlay
          muted
        />
        {/* Overlay Frame */}
        <img
          src={frame}
          alt="Overlay Frame"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
      <div className="absolute right-[200px] top-[45%]">
        <h1 className="text-[60px]" id="CountDown">
          {countdown > 0 ? countdown : ""}
        </h1>
      </div>
      {/* Hidden Canvas for Capturing Image */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CaptureImage;
