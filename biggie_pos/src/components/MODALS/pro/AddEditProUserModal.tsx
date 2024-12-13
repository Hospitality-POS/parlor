import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Space } from "antd";
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormSelect,
} from "@ant-design/pro-form";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import useAddEditUserModal from "../Hooks/useAddEditUserModal";
import { ProFormDigit } from "@ant-design/pro-components";
import { fetchUserRoles, updateUsers } from "@services/users";
import ShowConfirm from "@utils/ConfirmUtil";
import { User } from "src/interfaces/User";
import { PhoneInput } from "@components/PhoneNumber/PhoneNumber";
import { getPhoneNumber } from "@components/PhoneNumber/utils/formatPhoneNumberUtil";
import { reversePhoneNumber } from "@components/PhoneNumber/utils/reversePhoneNumberFormat";

interface AddEditProUserModalProps {
  onAddUser?: (user: User) => void;
  actionRef: any;
  edit?: boolean;
  data?: any;
}

const AddEditProUserModal: React.FC<AddEditProUserModalProps> = ({
  onAddUser,
  actionRef,
  edit,
  data,
}) => {
  const [form] = Form.useForm();
  const formRef = useRef();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        ...data,
        phoneNumber: reversePhoneNumber(data?.phone),
        roleId: data?.role?._id,
      });
    }
  }, [open, data, form]);

   const handleOpenChange = (newOpen: boolean) => {
     setOpen(newOpen);
     if (!newOpen) {
       form.resetFields();
     }
   };

  const { handleConfirmAddUser } = useAddEditUserModal({ onAddUser });

  return (
    <ModalForm
      form={form}
      formRef={formRef}
      title={
        <Space>
          <UsergroupAddOutlined />
          {edit ? "Edit User" : "Add New User"}
        </Space>
      }
      initialValues={
        data
          ? {
              ...data,
              phoneNumber: reversePhoneNumber(data?.phone),
              roleId: data?.role?._id,
            }
          : {}
      }
      trigger={
        data ? (
          <Button
            type="link"
            key="button"
            icon={<EditOutlined style={{ color: "#914F1E" }} />}
          ></Button>
        ) : (
          <Button key="button" icon={<UsergroupAddOutlined />}>
            New user
          </Button>
        )
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
      onFinish={async (values) => {
        const phoneNumber = getPhoneNumber(values?.phoneNumber);
        const value = { ...values, phone: phoneNumber };
        const confirmed = await ShowConfirm({
          title: `Are you sure you want to ${
            edit ? "update this" : "add new"
          } user?`,
          position: true,
        });
        if (confirmed) {
          edit
            ? await updateUsers({
                value,
                _id: data._id,
              })
            : await handleConfirmAddUser(value);
          actionRef.current?.reload();
          setOpen(false);
          return true;
        }
      }}
      open={open}
      onOpenChange={handleOpenChange}
      submitter={{
        searchConfig: {
          resetText: "Cancel",
          submitText: edit ? "Edit User" : "Add New User",
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          hasFeedback
          width="md"
          id="fullName"
          name="fullname"
          label="fullname"
          rules={[{ required: true, message: "Name is required" }]}
          placeholder="Enter user fullname"
        />
        <ProFormText
          hasFeedback
          width="md"
          name="username"
          label="username"
          rules={[{ required: true, message: "username is required" }]}
          placeholder="Enter preferred username"
        />

        <ProFormSelect
          hasFeedback
          width="md"
          name="roleId"
          label="Roles"
          rules={[{ required: true, message: "Roles is required" }]}
          showSearch
          placeholder="Select role"
          request={async (params) => {
            const data = await fetchUserRoles(params);
            return data.map((e: { role_type: any; _id: any }) => {
              return { label: e.role_type, value: e._id };
            });
          }}
        />

        <ProFormText
          hasFeedback
          width="md"
          id="user_email"
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          ]}
          placeholder="Enter user email"
        />

        <ProFormText.Password
          hasFeedback
          width="md"
          name="pin"
          label="Pin"
          tooltip="Users Login PIN 4 digits only"
          rules={[
            {
              required: true,
              pattern: /^[0-9]{4}$/,
              message: "Invalid Pin format",
            },
          ]}
          placeholder="Enter user Pin"
        />
        <ProFormDigit
          hasFeedback
          width="md"
          name="idNumber"
          label="ID Number"
          rules={[
            { required: true, message: "National ID Number is required" },
          ]}
          placeholder="Enter user National ID"
        />

        {/* <ProFormDigit
          hasFeedback
          width="md"
          name="phone"
          label="Phone"
          tooltip="Users Phone Number include 10 digits only"
          rules={[
            {
              required: true,
              message: "Invalid phone no. include 10 digits only.",
              pattern: /^\d{10}$/,
            },
          ]}
          placeholder="Enter supplier phone"
        /> */}
        <PhoneInput label="Phone" owner="phoneNumber" />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddEditProUserModal;
