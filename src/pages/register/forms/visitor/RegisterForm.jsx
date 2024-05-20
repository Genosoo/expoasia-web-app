/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import GetToken from '../../../../context/GetToken';
import { Button, Form, Input, message, Select } from 'antd'; // Import Select component from antd
import EmailForm from './EmailForm';
import Loader from './Loader';
import WaveBackground from '../../../../assets/wave-background.png';
import { useLocation } from 'react-router-dom';
import { apiCompanyOrgType, apiEmailConfirmation } from '../../../../api/api';

// import ReCAPTCHA from 'react-google-recaptcha';

const { Option } = Select; // Destructure Option from Select

const RegisterForm = () => {
  const csrfToken = GetToken();
  const location = useLocation();
  const user = location.state.user;

  const [uniqueID, setUniqueID] = useState("");
  const [formData, setFormData] = useState({
    invite_details: {
      custom_msg: "This is a test",
      event: 1
    },
    participant_details: {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      designation: "",
      company_org_other: "",
      military_branch: "",
      phone_no: "",
      viber_no: "",
      whatsapp_no: "",
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hashedCode, setHashedCode] = useState("");

  useEffect(() => {
    const fetchCompanyType = async () => {
      try {
        const response = await axios.get(apiCompanyOrgType);
        console.log("test:", response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyType();
  }, []);

  const handleRegisterParticipantSubmit = () => {
    // Perform client-side validation
    if (formData.participant_details.last_name === '') {
      message.error("Last Name field cannot be empty");
      return;
    }

    if (formData.participant_details.first_name === '') {
      message.error("First Name field cannot be empty");
      return;
    }

    if (formData.participant_details.designation === '') {
      message.error("Designation field cannot be empty");
      return;
    }

    if (formData.participant_details.phone_no === '') {
      message.error("Mobile No field cannot be empty");
      return;
    }

    if (formData.participant_details.viber_no === '') {
      message.error("Viber No field cannot be empty");
      return;
    }

    if (formData.participant_details.whatsapp_no === '') {
      message.error("WhatsApp No field cannot be empty");
      return;
    }

    if (formData.participant_details.email === '') {
      message.error("Email address field cannot be empty");
      return;
    }
    
    // If the validation passes, just log the formData
    console.log('Form Data:', formData);
    setRegistrationSuccess(true);
    sendEmailConfirmation()
  };

 
  
  const sendEmailConfirmation = async () => {
    try {
      const response = await axios.post(apiEmailConfirmation, {
        SendEmailConfirmation: {
          email_to_send: formData.participant_details.email
        }
      }, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      console.log(response);
      setHashedCode(response.data.success);
      message.success("OTP sent to your email successfully!");
    } catch (error) {
      console.error('Error sending email confirmation:', error);
      message.error("Failed to send OTP");
    } 
  };





  const handleFormChangeParticipant = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
    // Check if the field belongs to the participant_details object
    if (name.startsWith('participant_details.')) {
      // Extract the nested field name
      const nestedFieldName = name.split('.')[1];
      // Update the nested field
      updatedFormData.participant_details[nestedFieldName] = value;
    } else {
      // Update regular fields
      updatedFormData[name] = value;
    }
    setFormData(updatedFormData);
  };


  return (

     <>
      {!isSendingEmail && !registrationSuccess && (
            <Form layout="vertical">
              <Form.Item label="Last Name" required>
                <Input placeholder="Enter Last Name" value={formData.participant_details.last_name} name="participant_details.last_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="First Name" required>
                <Input placeholder="Enter First Name" value={formData.participant_details.first_name} name="participant_details.first_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Middle Name">
                <Input placeholder="Enter Middle Name" value={formData.participant_details.middle_name} name="participant_details.middle_name" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Designation" required>
                <Input placeholder="Enter Designation" value={formData.participant_details.designation} name="participant_details.designation" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Unit/Organization/Company Name" required>
                <Input placeholder="Enter Organization/Company Name" value={formData.participant_details.company_org_other} name="participant_details.company_org_other" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Military Branch of Service">
                <Input placeholder="Enter Military Branch of Service" value={formData.participant_details.military_branch} name="participant_details.military_branch" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Mobile No" required>
                <Input placeholder="Enter Mobile No" value={formData.participant_details.phone_no} name="participant_details.phone_no" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Viber No" required>
                <Input placeholder="Enter Viber No" value={formData.participant_details.viber_no} name="participant_details.viber_no" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="WhatsApp No" required>
                <Input placeholder="Enter WhatsApp No" value={formData.participant_details.whatsapp_no} name="participant_details.whatsapp_no" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item label="Email address" required>
                <Input placeholder="Enter Email address" value={formData.participant_details.email} name="participant_details.email" onChange={handleFormChangeParticipant} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className='w-full bg-[#11385D] text-white font-opensans' onClick={handleRegisterParticipantSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Register"}
                </Button>
              </Form.Item>
            </Form>
      )}
      {isSendingEmail && <Loader />} 
      {registrationSuccess && !isSendingEmail && 
        <EmailForm 
          hashedCode={hashedCode} 
          email={formData.participant_details.email} 
          uniqueID={uniqueID} 
          csrfToken={csrfToken}
          formDataReg={formData}
        />}
     </>
  );
};

export default RegisterForm;