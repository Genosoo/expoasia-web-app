/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import image from '../../../assets/congrats-check.svg';
import { Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDownload } from "react-icons/ai";
export default function Congrats({ qrCode }) {
  const navigate = useNavigate();
 
  const handleDownloadQRCode = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCode;
    downloadLink.download = 'QRCode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };


 
  const handleFinish = () => {
    navigate("/expo-asia/home");
  };

  return (
    <div className="congratsForm">
      <img className='check' src={image} alt="" />
      <h2>Congratulations! <br /> You're now registered.</h2>
      <div className="qrcodeBox">
      <Image width={200} src={qrCode} alt="QR Code"  className='qrcodeImage'/>
     <Button  icon={<AiOutlineDownload /> } onClick={handleDownloadQRCode}>
        Download
      </Button>
      </div>
     <h4>Please use this unique QR code to check in at the event venue. <br /> It will also be sent to your email shortly.</h4>
      <Button className='btn2' type="primary" onClick={handleFinish}>
        Finish
      </Button>
    </div>
  );
}
