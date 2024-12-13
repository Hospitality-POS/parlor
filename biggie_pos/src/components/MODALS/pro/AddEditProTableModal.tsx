import React, { useEffect, useState } from "react";
import { Button, Form, Space } from "antd";
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormSelect,
} from "@ant-design/pro-form";
import { AppstoreAddOutlined, EditOutlined } from "@ant-design/icons";
import { createNewTable, getTableLocation } from "../../../services/tables";
import ShowConfirm from "@utils/ConfirmUtil";

interface AddEditProTableModalProps {
  actionRef: any;
  data?: any;
}

const AddEditProTableModal: React.FC<AddEditProTableModalProps> = ({
  actionRef,
  data,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && data) {
      form.setFieldsValue({
        name: data.name,
        locatedAt: data.locatedAt?._id,
      });
    }
  }, [open, data, form]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.resetFields();
    }
  };

  return (
    <ModalForm
      onOpenChange={handleOpenChange}
      title={
        <Space>
          <AppstoreAddOutlined />
          {data ? "Add New Slots" : "Add New Slots"}
        </Space>
      }
      initialValues={
        data
          ? {
              name: data?.name,
              locatedAt: data?.locatedAt?._id,
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
          <Button key="button" icon={<AppstoreAddOutlined />}>
            New Slot
          </Button>
        )
      }
      onFinish={async (values) => {
        const confirmed = await ShowConfirm({
          title: `Are you sure you want to ${
            data ? "update this" : "add new"
          } Slot?`,
          position: true,
        });
        if (confirmed) {
          data ? "" : await createNewTable(values);
        }
        actionRef.current?.reload();
        setOpen(false);
        return true;
      }}
      form={form}
      submitter={{
        searchConfig: {
          resetText: "Cancel",
          submitText: data ? "Edit Slot" : "Add Slot",
        },
      }}
      modalProps={{
        destroyOnClose: true,
        centered: true,
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="Table Name"
          rules={[{ required: true, message: "Table name is required" }]}
          placeholder="Enter table name"
        />
        <ProFormSelect
          width="md"
          name="locatedAt"
          label="Slot"
          rules={[{ required: true, message: "Table Location is required" }]}
          showSearch
          placeholder="Select available location"
          request={async (params) => {
            const data = await getTableLocation(params);
            return data.map((e) => {
              return { label: e.name, value: e._id };
            });
          }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddEditProTableModal;
