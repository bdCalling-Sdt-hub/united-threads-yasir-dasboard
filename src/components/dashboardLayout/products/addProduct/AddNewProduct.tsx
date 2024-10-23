/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import EForm from "@/components/Form/FormProvider";
import EInput from "@/components/Form/ResInput";
import ESelect from "@/components/Form/ResSelect";
import ETextArea from "@/components/Form/ResTextarea";
import ErrorResponse from "@/components/shared/ErrorResponse";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useAddProductMutation } from "@/redux/api/productApi";
import { TCategory } from "@/types/categoryTypes";
import { TResponse } from "@/types/global";
import { Button, Col, ColorPicker, Popover, Row, Spin, Tooltip, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { PlusSquareFilled, UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// Define product size enum in zod
const productSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]);

// Define product validation schema in zod
const addProductValidation = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  shortDescription: z.string().optional(),
  category: z.string({ required_error: "Category is required" }),
  price: z.string({ message: "Price must be a positive number" }),
  size: z.array(productSizeEnum),
  stock: z.string({ required_error: "Stock is required" }),
});

const AddNewProduct = () => {
  const router = useRouter();
  const [addProduct] = useAddProductMutation();

  // Jodit Editor value
  const [longDescription, setLongDescription] = useState("");
  const [longDescError, setLongDescError] = useState("");
  const editor = useRef(null);

  // Size options
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => ({
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

  // Primary image file state (only 1 image)
  const [primaryImage, setPrimaryImage] = useState<any[]>([]);

  const handlePrimaryImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length <= 1) {
      setPrimaryImage(newFileList);
    } else {
      ErrorResponse({ message: "You can only upload 1 primary image." });
    }
  };

  const beforePrimaryImageUpload = () => {
    if (primaryImage.length >= 1) {
      ErrorResponse({ message: "You can only upload 1 primary image." });
      return false;
    }
    return true;
  };

  // Secondary image file list state (up to 4 images)
  const [secondaryImages, setSecondaryImages] = useState<any[]>([]);

  const handleSecondaryImageChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length <= 3) {
      setSecondaryImages(newFileList);
    } else {
      ErrorResponse({ message: "You can only upload up to 3 secondary images." });
    }
  };

  const beforeSecondaryImageUpload = () => {
    if (secondaryImages.length >= 3) {
      ErrorResponse({ message: "You can only upload up to 3 secondary images." });
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

    if (!primaryImage?.length) {
      ErrorResponse({
        message: "Please upload 1 primary image",
      });
      return;
    }

    const updatedData = {
      ...data,
      price: Number(data?.price),
      colorsPreferences: colors?.length ? colors.map((clr) => clr.hex) : [],
      size: data.size || [],
      shortDescription: data?.shortDescription,
      stock: Number(data?.stock),
      description: longDescription,
    };

    const toastId = toast.loading("Adding product...");

    const formData = new FormData();
    formData.append("data", JSON.stringify(updatedData));

    // Append primary image
    if (primaryImage.length) {
      formData.append("primaryImage", primaryImage[0].originFileObj);
    }

    // Append secondary images
    secondaryImages.forEach((image: any) => {
      formData.append("images", image.originFileObj);
    });

    try {
      await addProduct(formData).unwrap();

      toast.success("Product added successfully", {
        id: toastId,
        duration: 2000,
      });

      router.push("/admin/products");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <Suspense fallback={<Spin />}>
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
              <Suspense fallback={<Spin />}>
                <JoditEditor
                  ref={editor}
                  value={longDescription}
                  config={{
                    height: 400,
                  }}
                  onBlur={(newContent) => setLongDescription(newContent)}
                />
              </Suspense>
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
              name='stock'
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
              mode='multiple'
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

        {/* Primary Image Uploader */}
        <Col span={8} className='flex flex-col gap-4'>
          <div>
            <p className='mb-2 required-indicator text-lg'>Upload Primary Image</p>
            <Upload
              onChange={handlePrimaryImageChange}
              beforeUpload={beforePrimaryImageUpload}
              fileList={primaryImage}
              listType='picture'
              maxCount={1}
            >
              <div className='border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer'>
                <UploadOutlined />
                <button>Upload</button>
              </div>
            </Upload>
          </div>

          {/* Secondary Images Uploader */}
          <div>
            <p className='mb-2 required-indicator text-lg'>Upload Images (Max 4)</p>
            <Upload
              onChange={handleSecondaryImageChange}
              beforeUpload={beforeSecondaryImageUpload}
              fileList={secondaryImages}
              listType='picture'
              maxCount={4}
              multiple
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
        <Button
          onClick={router.back}
          className='w-1/2 bg-white h-[44px] text-black font-500 text-20'
        >
          Cancel
        </Button>
      </div>
    </Suspense>
  );
};

export default AddNewProduct;
