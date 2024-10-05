/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import EForm from "@/components/Form/FormProvider";
import EInput from "@/components/Form/ResInput";
import ETextArea from "@/components/Form/ResTextarea";
import ErrorResponse from "@/components/shared/ErrorResponse";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useAddProductMutation } from "@/redux/api/productApi";
import { InfoCircleOutlined, PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Col, ColorPicker, Popover, Row, Tooltip, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ESelect from "@/components/Form/ResSelect";
import { TResponse } from "@/types/global";
import { TCategory } from "@/types/categoryTypes";

// Define product size enum in zod
const productSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]);

// Define product validation schema in zod
export const addProductValidation = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().min(1, { message: "Product description is required" }),
  shortDescription: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  quantity: z.number().min(0, { message: "Quantity must be 0 or greater" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  size: z.array(productSizeEnum),
});

const AddNewProduct = () => {
  const router = useRouter();
  const [addProduct] = useAddProductMutation();

  // Jodit Editor value
  const [longDescription, setLongDescription] = useState("");
  const [longDescError, setLongDescError] = useState("");
  const editor = useRef(null);

  // Size options
  const sizeOptions = ["XS", "S", "M", "L", "XL"].map((size) => ({
    label: size,
    value: size,
  }));

  // Color options state
  const [colors, setColors] = useState<any[]>([]);
  const handleColor = (colorObj: any) => {
    const { key } = colorObj;
    const exist = colors.find((clr) => clr.key === key);

    if (exist) {
      const rest = colors.filter((clr) => clr.key !== exist.key);
      setColors([...rest, colorObj]);
    } else {
      setColors([...colors, colorObj]);
    }
  };

  const handleAddNewColor = () => {
    setColors([...colors, { key: colors.length + 1, hex: "#ffffff" }]);
  };

  // Get categories from the API
  const { data: categoryRes } = useGetCategoriesQuery({ limit: 99999 });
  const categories = categoryRes as TResponse<TCategory[]>;

  // Product image file list state
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length <= 3) {
      setFileList(newFileList);
    } else {
      ErrorResponse({ message: "You can only upload up to 3 photos." });
    }
  };

  const beforeUpload = () => {
    if (fileList.length >= 3) {
      ErrorResponse({ message: "You can only upload up to 3 photos." });
      return false;
    }
    return true;
  };

  // Submit form data
  const onSubmit = async (data: any) => {
    setLongDescError("");

    if (!longDescription) {
      setLongDescError("Detailed description of the product can't be empty!");
      return;
    }

    if (!fileList?.length) {
      ErrorResponse({
        message: "Please upload at least 1 product image",
      });
      return;
    }

    const updatedData = {
      ...data,
      stock: Number(data?.quantity),
      price: Number(data?.price),
      color: colors?.length ? colors.map((clr) => clr.hex) : [],
      size: data.size || [],
      shortDescription: data?.shortDescription,
      description: longDescription,
    };

    const toastId = toast.loading("Adding product...");

    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedData));

    // Append multiple images to formData
    const images = fileList.map((file: any) => file.originFileObj);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await addProduct(formData).unwrap();

      toast.success("Product added successfully", {
        id: toastId,
        duration: 2000,
      });

      router.push("/seller/products");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <EForm onSubmit={onSubmit} resolver={zodResolver(addProductValidation)}>
            <EInput
              label='Enter Product Name'
              placeholder='Enter Product Name'
              name='name'
              size='large'
              type='text'
            />

            <ETextArea
              label='Short description'
              placeholder='Enter short description (max 400 characters)'
              name='shortDescription'
              style={{ height: "70px" }}
              maxLength={400}
            />

            <div className='space-y-2 mb-10' id='add-product-detailed-desc'>
              <label>Detailed Description</label>
              <JoditEditor
                ref={editor}
                value={longDescription}
                config={{
                  height: 400,
                  //placeholder: "Enter detailed description of your product",
                }}
                onBlur={(newContent) => setLongDescription(newContent)}
              />
              {longDescError && <p style={{ color: "red" }}>{longDescError}</p>}
            </div>

            <ESelect
              name='category'
              options={
                categories?.data?.length
                  ? categories.data.map((category: TCategory) => ({
                      value: category._id,
                      label: category.name,
                    }))
                  : []
              }
              size='large'
              label='Select Product Category'
              placeholder='Select category'
            />

            <EInput
              label='Stock Quantity'
              placeholder='Enter stock quantity'
              name='quantity'
              size='large'
              type='number'
            />

            <EInput
              label='Price'
              placeholder='Enter product price'
              name='price'
              size='large'
              type='number'
            />

            <ESelect
              label={
                <div>
                  Select Sizes (Optional)
                  <Popover
                    content={
                      <ul>
                        <li>
                          <em>Number:</em> (inch)
                        </li>
                        <li>
                          <em>Text:</em> (standard)
                        </li>
                      </ul>
                    }
                    title='Size Unit(s)'
                  >
                    <InfoCircleOutlined style={{ color: "#4169e1", marginLeft: "4px" }} />
                  </Popover>
                </div>
              }
              name='size'
              mode='tags'
              options={sizeOptions}
              placeholder='Enter size (press enter to add more)'
              size='large'
            />

            {/* Select colors */}
            <div>
              <label htmlFor='colors'>Select Colors (Optional)</label>

              <div className='flex items-center gap-x-4 mt-2'>
                {colors.map((color) => (
                  <button type='button' key={color?.key}>
                    <ColorPicker
                      defaultValue={color?.hex}
                      showText
                      allowClear
                      onChange={(value) =>
                        handleColor({
                          key: color?.key,
                          hex: `#${value.toHex()}`,
                        })
                      }
                    />
                  </button>
                ))}

                {/* Add color button */}
                <Tooltip title='Add Color'>
                  <button type='button' onClick={handleAddNewColor}>
                    <PlusSquareFilled
                      style={{
                        color: "gray",
                        fontSize: "22px",
                      }}
                    />
                  </button>
                </Tooltip>
              </div>
            </div>

            <button className='hidden' type='submit' id='formSubmitBtn'></button>
          </EForm>
        </Col>
        <Col span={8} className='flex justify-center'>
          <div>
            <p className='mb-2 required-indicator'>Upload Product Image</p>
            <Upload
              onChange={handleChange}
              beforeUpload={beforeUpload}
              fileList={fileList}
              listType='picture'
              maxCount={3}
            >
              <div className='border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer'>
                <UploadOutlined />
                <button>Upload</button>
              </div>
            </Upload>
          </div>
        </Col>
      </Row>
      <div className='flex justify-between gap-x-6 mt-10'>
        <Button
          htmlType='submit'
          className='w-1/2 bg-primary h-[44px] text-white font-500 text-20'
          onClick={() => document.getElementById("formSubmitBtn")?.click()}
        >
          Upload
        </Button>
        <Button className='w-1/2 bg-white h-[44px] text-black font-500 text-20'>Cancel</Button>
      </div>
    </div>
  );
};

export default AddNewProduct;
