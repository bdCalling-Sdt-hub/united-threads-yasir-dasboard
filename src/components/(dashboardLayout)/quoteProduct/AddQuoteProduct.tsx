import { Button, Form, FormProps, Input, Modal, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PiUploadLight } from "react-icons/pi";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

type FieldType = {
  category: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const AddQuoteProduct = ({ open, setOpen }: TPropsType) => {
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
      <div className="pb-2">
        <div className="mt-2">
          <Form layout="vertical" onFinish={onFinish}>
            {/* input product name */}
            <Form.Item label="Product Name" name="productName">
              <Input size="large" placeholder="Enter Product Name"></Input>
            </Form.Item>

            {/* input category */}
            <Form.Item label="Category" name="category">
              <Select
                placeholder="Select Category"
                size="large"
                onChange={handleChange}
                options={[
                  { value: "PANT", label: "PANT" },
                  { value: "CLOTH", label: "CLOTH" },
                  { value: "WATCH", label: "WATCH" },
                  { value: "COSMETICS", label: "COSMETICS" },
                  { value: "JEWELRY", label: "JEWELRY" },
                  { value: "SUNGLASSES", label: "SUNGLASSES" },
                  { value: "CATEGORY", label: "CATEGORY" },
                ]}
              />
            </Form.Item>

            {/* input Materials Preference  */}
            <Form.Item label="Materials Preference" name="materialsPreference ">
              <TextArea rows={3} placeholder="start writing....."></TextArea>
            </Form.Item>

             {/* image upload  */}
             <Form.Item
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                style={{
                  textAlign: "center",
                  border: "2px dashed #000",
                  minHeight: "150px",
                  overflow: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <Upload
                  name="image"
                  listType="picture"
                  beforeUpload={() => false}
                  style={{
                    
                  }}
                >
                  <div className="flex flex-col justify-center items-center">
                  <PiUploadLight  size={40}  className="" />
                  <p>
                  Design Upload
                  </p>
                  </div>
                </Upload>
              </Form.Item>

            <Button htmlType="submit" block size="large">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddQuoteProduct;
