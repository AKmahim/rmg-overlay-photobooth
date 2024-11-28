import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

import qrbg from "../../assets/qr.png";

const QrPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { photoUrl } = location.state || {}; // Get photoUrl from state

    useEffect(() => {
        const handleKeyPress = (event) => {
            console.log(event.key);
            if (event.key === "X" || event.key === "x") {
                navigate("/");
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen relative">
            <div className="relative">
                <img className="w-screen h-screen" src={qrbg} />
            </div>
            <div className="absolute top-[270px] left-[50%] transform -translate-x-1/2">
                {photoUrl ? (
                    <>
                        <QRCodeCanvas
                            className="rounded-xl shadow-lg shadow-slate-600"
                            value={photoUrl} // URL for the QR code
                            size={250} // Set size to 500x500
                            includeMargin={true}
                        />
                        <h3 className="text-black text-2xl font-bold text-center mt-5">স্ক্যান করুন</h3>
                    </>
                ) : (
                    <p>No photo URL available</p>
                )}
            </div>
            <button
                className="absolute bottom-20 left-[50%] transform -translate-x-1/2 bg-[#344B9B] mx-auto text-center inline-flex items-center gap-2 border border-white px-4 py-3  hover:bg-[#3AB6FE]  focus:outline-none rounded-md "
                onClick={() => navigate("/")}
            >
                <img src="/home_btn-l.png" />
                <span className="text-2xl font-medium px-6 text-white truncate">
                    হোম পেজ
                </span>
                <img src="/home_btn-r.png" />
            </button>
        </div>
    );
};

export default QrPage;
