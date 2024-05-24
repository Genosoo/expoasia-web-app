import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined  } from '@ant-design/icons';
import GetToken from '../../../../context/GetToken'
import useAdminStore from '../../../../store/adminStore';

const Participant = () => {
  const { 
      participantData,
      fetchParticipants, 
      deleteParticipant, 
      updateParticipant,
      createParticipant,
      fetchCompany, 
      companyData,
      setCsrfToken 
  } = useAdminStore();

  const csrfToken = GetToken();
  const [visible, setVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [updatingParticipant, setUpdatingParticipant] = useState(null);
  const [form] = Form.useForm();
  const [createForm] = Form.useForm()

  useEffect(() => {
    fetchParticipants();
    fetchCompany();
    setCsrfToken(csrfToken);
  }, [fetchParticipants, fetchCompany, setCsrfToken, csrfToken]);

  useEffect(() => {
    if (updatingParticipant) {
      form.setFieldsValue(updatingParticipant);
    }
  }, [updatingParticipant, form]);


  const totalCount = participantData.length;

  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => {
        const date = new Date(record.created_at);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      },
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      filters: Array.from(new Set(participantData.map(item => item.first_name))).map(first_name => ({
        text: first_name,
        value: first_name,
      })),
      onFilter: (value, record) => record.first_name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      filters: Array.from(new Set(participantData.map(item => item.last_name))).map(last_name => ({
        text: last_name,
        value: last_name,
      })),
      onFilter: (value, record) => record.last_name.includes(value),
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      filters: participantData.map((item) => ({
        text: item.email,
        value: item.email,
      })),
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      filters: Array.from(new Set(participantData.map(item => item.designation))).map(designation => ({
        text: designation,
        value: designation,
      })),
      onFilter: (value, record) => record.designation.includes(value),
      filterSearch: true,
    },
    {
      title: 'Unit/Organization/Company',
      dataIndex: 'company_org_other',
    },
    {
      title: 'Military Branch',
      dataIndex: 'military_branch',
      filters: Array.from(new Set(participantData.map(item => item.military_branch))).map(military_branch => ({
        text: military_branch,
        value: military_branch,
      })),
      onFilter: (value, record) => record.military_branch.includes(value),
      filterSearch: true,
    },
    {
      title: 'Mobile No',
      dataIndex: 'phone_no',
    },
    {
      title: 'Viber No',
      dataIndex: 'viber_no',
    },
    {
      title: 'Whatsapp No',
      dataIndex: 'whatsapp_no',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      render: (_, record) => (
        <span className='flex gap-3 flex-col items-center'>
          <Button
            icon={<EditOutlined />}
            size='small'
            onClick={() => handleEdit(record)}
          >
            Update
          </Button>
          <Popconfirm
            title='Are you sure to delete this participant?'
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button size='small' icon={<DeleteOutlined />}  danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (participant) => {
    setUpdatingParticipant(participant);
    setVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteParticipant(id, csrfToken);
      message.success('Participant deleted successfully');
    } catch (error) {
      console.error('Error deleting participant:', error);
      message.error('Failed to delete participant');
    }
  };

  const handleUpdate = async (values) => {
    const {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
    } = values;

    if (
      !first_name ||
      !last_name ||
      !middle_name ||
      !email ||
      !designation ||
      !company_org ||
      !military_branch ||
      !phone_no ||
      !viber_no ||
      !whatsapp_no
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
    };

    const isChanged = Object.keys(updatedData).some(
      (key) => updatedData[key] !== updatingParticipant[key]
    );

    if (!isChanged) {
      message.warning('No changes made.');
      setVisible(false);
      return;
    }
    try {
      await updateParticipant(updatingParticipant.id, updatedData, csrfToken);
      setVisible(false);
      message.success('Participant updated successfully');
    } catch (error) {
      console.error('Error updating participant:', error);
      message.error('Failed to update participant');
    }
  };


  const handleCreate = async (values) => {
    const {
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
    } = values;

    if (
      !first_name ||
      !last_name ||
      !middle_name ||
      !email ||
      !designation ||
      !company_org ||
      !military_branch ||
      !phone_no ||
      !viber_no ||
      !whatsapp_no
    ) {
      message.error('Please fill in all required fields.');
      return;
    }

    const newParticipant = { 
      first_name,
      last_name,
      middle_name,
      email,
      designation,
      company_org_other,
      company_org,
      military_branch,
      phone_no,
      viber_no,
      whatsapp_no,
     };

    try {
      await createParticipant(newParticipant, csrfToken);
      setCreateVisible(false);
      message.success('Participant created successfully');
      fetchParticipants()
      createForm.resetFields();
    } catch (error) {
      console.error('Error creating Participant:', error);
      message.error('Failed to create Participant');
    }
  };


  return (
    <div className='tableContainer'>
      <div className="tableHeader">
      <h1 className='tableTitle'>Participants</h1>
      <div className="flex gap-2">
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => setCreateVisible(true)}
            className='buttonTableHeader'
          >
            Create Participant
          </Button>
        <Button
          icon={<ReloadOutlined />}
          type='primary'
          onClick={fetchParticipants}
          className="buttonTableHeader"
        >
          Refresh
        </Button>
      </div>
      </div>
      <Table
       bordered
        columns={columns}
        dataSource={participantData}
        scroll={{ x: 1300, y:450 }}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <p className='total'>
              Total: <b>{totalCount}</b>
            </p>
          </div>
        )}
      />
      <Modal
        title='Update Participant'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          className='mt-10'
          onFinish={handleUpdate}
          initialValues={{
            first_name: updatingParticipant ? updatingParticipant.first_name : '',
            last_name: updatingParticipant ? updatingParticipant.last_name : '',
            middle_name: updatingParticipant ? updatingParticipant.middle_name : '',
            email: updatingParticipant ? updatingParticipant.email : '',
            designation: updatingParticipant ? updatingParticipant.designation : '',
            company_org_other: updatingParticipant
              ? updatingParticipant.company_org_other
              : '',
              company_org: updatingParticipant
              ? updatingParticipant.company_org
              : '',
            military_branch: updatingParticipant
              ? updatingParticipant.military_branch
              : '',
            phone_no: updatingParticipant ? updatingParticipant.phone_no : '',
            viber_no: updatingParticipant ? updatingParticipant.viber_no : '',
            whatsapp_no: updatingParticipant ? updatingParticipant.whatsapp_no : '',
          }}
        >
          <Form.Item
            label='First Name'
            name='first_name'
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='last_name'
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Middle Name' name='middle_name'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Designation'
            name='designation'
            rules={[{ required: true, message: 'Please input designation!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Unit/Organization/Company Name'
            name='company_org'
            rules={[{ required: true, message: 'Please input Unit/Organization/Company Name!' }]}

          >
              <Select placeholder="Select a company ">
              {companyData.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Other Company'
            name='company_org_other'
          >
            <Input />
          </Form.Item>
          <Form.Item label='Military Branch' name='military_branch'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Mobile No'
            name='phone_no'
            rules={[{ required: true, message: 'Please input Mobile Number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Viber Number' name='viber_no'>
            <Input />
          </Form.Item>
          <Form.Item label='WhatsApp Number' name='whatsapp_no'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>


      {/* Create Participant Form */}
      <Modal
        title='Create Participant'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <Form
           form={createForm}
          className='mt-10'
          onFinish={handleCreate}
        >
          <Form.Item
            label='First Name'
            name='first_name'
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Last Name'
            name='last_name'
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Middle Name'
            name='middle_name'
            rules={[{  message: 'Please input middle name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Designation'
            name='designation'
            rules={[{ required: true, message: 'Please input designation!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Military Branch of Service (if applicable)'
            name='military_branch'
            rules={[{  message: 'Please input military branch of service!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Phone No'
            name='phone_no'
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Viber No'
            name='viber_no'
            rules={[{ required: true, message: 'Please input viber number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Whatsapp No'
            name='whatsapp_no'
            rules={[{ required: true, message: 'Please input whatsapp number!' }]}
          >
            <Input />
          </Form.Item>
        
          <Form.Item label='Website' name='website'>
            <Input />
          </Form.Item>
          <Form.Item
            label='Company'
            name='company_org'
            rules={[{ required: true, message: 'Please select company ' }]}
          >
            <Select placeholder="Select a company ">
              {companyData.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Other Company'
            name='company_org_other'
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className='buttonCreate' type='primary' htmlType='submit'>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Participant;
