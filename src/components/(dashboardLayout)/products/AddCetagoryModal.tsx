/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useState } from "react";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

type FieldType = {
  name: string;
};

const AddCetagoryModal = ({ open, setOpen }: TPropsType) => {
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [addCategory] = useAddCategoryMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(values));

      const res = await addCategory(formData).unwrap();
      if (res.success) {
        form.resetFields();
        setOpen(false);
      } else {
        setError(res.message);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      <div className='pb-2'>
        <h4 className='text-center text-2xl font-medium'>Add new category </h4>
        <div className='mt-10'>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Category name' name='name'>
              <Input size='large' placeholder='Enter category name'></Input>
            </Form.Item>
            {error && <p className='text-red-500 pb-2'>{error}</p>}
            <Button htmlType='submit' block size='large'>
              Add Category
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCetagoryModal;
