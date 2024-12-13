import React from "react";
import { Button, Form, Space } from "antd";
import { ModalForm, ProFormText, ProForm } from "@ant-design/pro-form";
import { DollarOutlined, EditOutlined } from "@ant-design/icons";
import ShowConfirm from "@utils/ConfirmUtil";
import { addNewPaymentMethod, updateMethod } from "@services/paymentMethod";

interface AddProPaymentMethodSettingsModalProps {
  actionRef: any;
  edit?: boolean;
  data?: any;
}

const AddProPaymentMethodSettingsModal: React.FC<
  AddProPaymentMethodSettingsModalProps
> = ({ actionRef, edit, data }) => {
  const [form] = Form.useForm();

  return (
    <Space align="center" direction="vertical" size={"small"}>
      <ModalForm
        title={
          <Space>
            <DollarOutlined />
            Add New Method
          </Space>
        }
        initialValues={edit ? { ...data } : {}}
        trigger={
          edit ? (
            <Button
              key="button"
              type="link"
              icon={
                <EditOutlined
                  style={{ color: "#914F1E" }}
                  onClick={() => form.setFieldsValue(data)}
                />
              }
            ></Button>
          ) : (
            <Button key="button" icon={<DollarOutlined />}>
              New
            </Button>
          )
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          centered: true,
        }}
        onFinish={async (values) => {
          const confirmed = await ShowConfirm({
            title: `Are you sure you want to ${
              edit ? "update this" : "add new"
            } payment method?`,
          });
          if (confirmed) {
            edit
              ? await updateMethod({ values, _id: data._id })
              : await addNewPaymentMethod(values);
            actionRef.current.reset();
            return true;
          }
        }}
        onOpenChange={(visible) => !visible}
        submitter={{
          searchConfig: {
            resetText: "Cancel",
            submitText: edit ? "Edit method" : "Add Payment Method",
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            hasFeedback
            width="lg"
            name="name"
            label="Payment Method Name"
            rules={[{ required: true, message: "Name is required" }]}
            placeholder="Enter payment method name"
          />
        </ProForm.Group>
      </ModalForm>
    </Space>
  );
};

export default AddProPaymentMethodSettingsModal;
