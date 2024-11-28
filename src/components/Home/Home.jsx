import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import HomeImg from "../../assets/home.jpg";

const Home = () => {
    const navigate = useNavigate();

    // Function to toggle full screen using f key
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(
                    `Error attempting to enable full-screen mode: ${err.message}`
                );
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    useEffect(() => {
        const handleKeyPress = (event) => {
            // console.log(event.keyCode);
            if (event.key === "F" || event.key === "f") {
                toggleFullScreen();
            } else if (event.key === " ") {
                // Space key
                navigate("/capture-image");
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="flex justify-center items-center">
            <img className="w-full h-screen" src={HomeImg} />
            <button
                className="absolute bottom-20 left-[50%] transform -translate-x-1/2 bg-[#344B9B] mx-auto text-center inline-flex items-center gap-2 border border-white px-4 py-3  hover:bg-[#3AB6FE]  focus:outline-none rounded-md "
                onClick={() => navigate("/capture-image")}
            >
                <img src="/home_btn-l.png" />
                <span className="text-2xl font-medium px-6 text-white truncate">
                    ক্লিক করুন
                </span>
                <img src="/home_btn-r.png" />
            </button>
        </div>
    );
};

export default Home;
