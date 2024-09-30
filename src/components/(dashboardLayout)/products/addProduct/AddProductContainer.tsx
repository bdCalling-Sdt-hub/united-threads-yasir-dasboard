"use client";
import { Button, Checkbox, Form, FormProps, GetProp, Input, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PiUploadLight } from "react-icons/pi";





type FieldType = {
  category: string;
};

const sizeOptions = ['S', 'M', 'L', "XL", "XXl"];

const AddProductContainer = () => {
    const [size, setSize] = useState([])

    const onSelectSize: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        console.log('checked = ', checkedValues );
        setSize(checkedValues as []) 
        console.log(size);
      };

      const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
      };

  return (
    <div>
      <h1 className="text-2xl font-bold w-full">Add Product </h1>
      {/* product add from */}
      <div className="mt-10">
        <Form layout="vertical" onFinish={onFinish}>
          <div className="flex  gap-x-20">
            <div className="flex-1">
                {/* input product name */}
              <Form.Item label="Product Name" name="productName" rules={[{required: true, message:"Please Enter Product Name"}]}
              >
                <Input size="large" placeholder="Enter Product Name"></Input>
              </Form.Item>

                {/* input description */}
              <Form.Item label="Short Description" name="description"  rules={[{required: true, message:"Please Enter Short Description"}]}>
               <TextArea rows={4} placeholder="Enter Short Description"></TextArea>
              </Form.Item>

                 {/* input category  */}
                 <Form.Item label="Category" name="category"  rules={[{required: true, message:"Please Enter Category"}]}>
                <Input size="large" placeholder="Enter Category "></Input>
              </Form.Item>

                 {/* input Stock Quantity  */}
                 <Form.Item label="Stock Quantity " name="stockQuantity"  rules={[{required: true, message:"Please Enter Stock Quantity"}]}>
                <Input size="large" placeholder="Enter Category "></Input>
              </Form.Item>

                 {/* input Price  */}
                 <Form.Item label="Price " name="Price"  rules={[{required: true, message:"Please Enter Price"}]}>
                <Input size="large" placeholder="Enter Price "></Input>
              </Form.Item>

                 {/* input Size*/}
                 <Form.Item label="Size(Optional) " name="size" >
                 <Checkbox.Group options={sizeOptions}  onChange={onSelectSize} />
              </Form.Item>



            </div>
            <div className="flex-1">
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
                >
                  <div className="flex flex-col justify-center items-center">
                  <PiUploadLight  size={40}  className="" />
                  <p>
                  Drop your imager here, or browse <br />
                  Jpeg, png are allowed
                  </p>
                  </div>
                </Upload>
              </Form.Item>
            </div>
          </div>
          <Button htmlType="submit" block size="large">
            Upload
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProductContainer;
