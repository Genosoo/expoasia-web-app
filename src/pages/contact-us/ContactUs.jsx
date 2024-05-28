import "./ContactUs.css"
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "../footer/Footer";
import {motion as m} from "framer-motion"
import { FloatButton } from 'antd';
import GoogleMap from "./GoogleMap";


export default function ContactUs() {
  return (
    <m.div
    variants={{
      hidden: { opacity: 0, y:75 },
      visible: { opacity: 1, y:0 },
    }}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.50 }}
    className="contactContainer">
     <div className="contactHeader">
     <h1>Get in Touch</h1>
      <p>We're here to help! For any inquiries, assistance, or additional information about the Air Force Symposium and Expo 2024, please reach out to us. <br /> 
        We look forward to connecting with you!</p>

     </div>
      <div className="contactWrapper">
           <div className="contactBoxWrapper">
              <div className="contactBoxContainer">
                  <div className="contactBox">
                      <h2 className="contactBoxTitle">
                        Contact Us
                      </h2>     
                     <div className="contactContentWrapper">
                     <div className="contactContent">
                          <h4>ExpoAsia</h4> 
                          <p><BsTelephoneFill />+63 966 944 8936</p>   
                          <p><MdEmail />sales@expoasia.online</p>
                      </div>   
                      <div className="contactContent">
                          <h4>Philippine Air Force</h4> 
                           <div className="contentText">
                             <p className="text">For any inquiries, please contact:</p>
                             <p className="text2">LTC MARVIN D ALAMBRA PAF (GSC)</p>
                             <p className="text">Executive Officer, OA-5</p>
                           </div>
                           
                          <p><BsTelephoneFill />+63 917 846 2006</p>
                          <div className="emails">
                               <MdEmail />
                            <p>alambra.marvin@airforce.mil.ph <br />
                            oa5.dsp@airforce.mil.ph <br />
                            dsp.a5hpaf@gmail.coms
                            </p>
                           </div>   
                      </div> 
                    </div>              
                </div>
                <div className="contactBox">
                <h2 className="contactBoxTitle">
                    Follow us
                 </h2>    

                 <div className="social">
                 <a href="https://www.facebook.com/profile.php?id=100088332602409" target='_blank'>
                  <FaFacebook />
                </a>

                <a href="https://www.instagram.com/expoasiainc/" target='_blank'>
                  <RiInstagramFill />
                </a>

                <a  href="https://twitter.com/expoasiainc" target='_blank'>
                  <FaXTwitter />
                </a>
                 </div>
                </div>
              </div>
            <div className="contactBoxMap">
              <GoogleMap />
            </div>
           </div>
      </div>
      <FloatButton.BackTop />
      <Footer />

    </m.div>

  )
}
