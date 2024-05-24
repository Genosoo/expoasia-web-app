/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import image from '../../../../assets/congrats-check.png';
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
    navigate("/");
  };

  console.log('QR Code:', qrCode)

  return (
          <div className="congratsForm">
          <img className='check' src={image} alt="Checkmark" />
          <h2>Congratulations! <br /> You're now registered.</h2>
          {/* <p>
            Your registration has been successfully completed, and we are excited to <br /> 
            have you join us for this event. Our Expo Asia team will be reaching out to <br />
            you shortly to discuss further details about the event. You can expect to <br /> 
            hear from us within the next few  days.
            </p>
            <p>
            In the meantime, if you have any immediate questions or need assistance, <br />
             please do not hesitate to contact us at <br />
              <b>+63 966 944 8936</b> or <b>sales@expoasia.online</b>
            </p> */}
          <div className="qrcodeBox">
            <Image width={200} src={qrCode} alt="QR Code" className='qrcodeImage' />
            <Button icon={<AiOutlineDownload />} onClick={handleDownloadQRCode}>
              Download
            </Button>
            </div>
             <h4>
             Please use this unique QR code to check in at the event venue. <br />
             It will also be sent to your email shortly.
             </h4>
            <h4>
            <b>Note:</b> If you do not see an email from us in your inbox, please check your <br /> junk or spam folder. Sometimes, emails may be filtered incorrectly. <br /> Thank you!
            </h4>
            <Button className='btn2' type="primary" onClick={handleFinish}>
              Finish
            </Button>
          </div>
      
  );
}
