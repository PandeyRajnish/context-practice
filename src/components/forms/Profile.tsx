import React, { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  cityOptions,
  experienceOptions,
  qualificationOptions,
  roleOptions,
  skillOptions,
} from "../../constants";
import axios from "axios";
import { useProfileForm } from "../../context/ProfileFormContext";

const Profile = () => {
  const { formData, updateFormData } = useProfileForm();

  const [loading, setLoading] = useState<boolean>(false);

  const { Option } = Select;
  const [form] = Form.useForm();

  const handleUpdate = async () => {
    setLoading(true);

    try {
      // Make the API call
      await axios.post(
        "https://app-demo-two.vercel.app/api/updateProfile",
        formData
      );

      // Reset the form fields in the UI
      form.resetFields();

      setLoading(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const handleFileUpload = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onUploadChange = (info: any) => {
    if (info.file.status === "done" || info.file.status === "error") {
      updateFormData({ ...formData, upload: info.fileList });
    }
  };

  const handleEdit = () => {
    form.setFieldsValue({ ...formData });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const emailValidator = (_: any, value: string) => {
    if (!value || value.includes("@")) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid email address!");
  };

  const stringValidator = (_: any, value: string) => {
    const alphabetRegex = /^[a-zA-Z\s,.']+$/;

    if (typeof value === "string" && alphabetRegex.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Please enter a valid string!");
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 15 }}
      initialValues={{ remember: true }}
      onFinish={handleUpdate}
      onFinishFailed={onFinishFailed}
    >
      <div style={{ display: "flex", marginBottom: "4px" }}>
        <div style={{ marginRight: "8px", flex: 1 }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter your full name!" },
              { validator: stringValidator },
              {
                max: 60,
                message: "Name cannot be longer than 60 characters!",
              },
            ]}
          >
            <Input
              placeholder="Enter your name"
              onChange={(e) => updateFormData({ fullName: e.target.value })}
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginRight: "8px" }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { validator: emailValidator },
              {
                max: 50,
                message: "email cannot be longer than 50 characters!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
          </Form.Item>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "4px" }}>
        <div style={{ marginRight: "8px", flex: 1 }}>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter your address!" },
              { validator: stringValidator },
              {
                max: 100,
                message: "Address cannot be longer than 100 characters!",
              },
            ]}
          >
            <Input
              placeholder="Enter your address"
              onChange={(e) => updateFormData({ address: e.target.value })}
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginRight: "8px" }}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please select your city!" }]}
          >
            <Select
              placeholder="Select your city"
              onChange={(value) => updateFormData({ city: value })}
            >
              {cityOptions.map((city) => (
                <Option key={city.value} value={city.value}>
                  {city.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "4px" }}>
        <div style={{ marginRight: "8px", flex: 1 }}>
          <Form.Item
            label="Education"
            name="education"
            rules={[
              { required: true, message: "Please select your education!" },
            ]}
          >
            <Select
              placeholder="Select your education"
              onChange={(value) => updateFormData({ education: value })}
            >
              {qualificationOptions.map((qualification) => (
                <Option key={qualification.value} value={qualification.value}>
                  {qualification.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginRight: "8px" }}>
          <Form.Item
            label="Key Skills"
            name="keySkill"
            rules={[
              { required: true, message: "Please select your key skills!" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select your key skills"
              onChange={(value) => updateFormData({ skills: value })}
            >
              {skillOptions.map((skill) => (
                <Option key={skill.value} value={skill.value}>
                  {skill.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "4px" }}>
        <div style={{ marginRight: "8px", flex: 1 }}>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              { required: true, message: "Please select your role!" },
              { validator: stringValidator },
              {
                max: 30,
                message: "Role cannot be longer than 30 characters!",
              },
            ]}
          >
            <Select
              placeholder="Select your role"
              onChange={(value) => updateFormData({ role: value })}
            >
              {roleOptions.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginRight: "8px" }}>
          <Form.Item
            label="Experience"
            name="experience"
            rules={[
              { required: true, message: "Please select your experience!" },
            ]}
          >
            <Select
              placeholder="Select your YOE"
              onChange={(value) => updateFormData({ experience: value })}
            >
              {experienceOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: "4px" }}>
        <div style={{ marginRight: "8px", flex: 1 }}>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              { required: true, message: "Please input your bio in short" },
              { validator: stringValidator },
              {
                max: 100,
                message: "Bio cannot be longer than 100 characters!",
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="Enter short bio"
              onChange={(e) => updateFormData({ bio: e.target.value })}
            />
          </Form.Item>
        </div>
        <div style={{ flex: 1, marginRight: "8px" }}>
          <Form.Item
            label="Profile Upload"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={handleFileUpload}
          >
            <Upload
              name="file"
              listType="picture-card"
              onChange={onUploadChange}
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined rev={undefined} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 15,
          justifyContent: "center",
        }}
      >
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={handleEdit}>
            Edit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Profile;
