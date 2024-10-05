/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import EForm from "@/components/Form/FormProvider";
import EInput from "@/components/Form/ResInput";
import ETextArea from "@/components/Form/ResTextarea";
import ErrorResponse from "@/components/shared/ErrorResponse";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetSingleProductQuery, useUpdateProductMutation } from "@/redux/api/productApi";
import { InfoCircleOutlined, PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Col, ColorPicker, Popover, Row, Spin, Tooltip, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ESelect from "@/components/Form/ResSelect";
import { TResponse } from "@/types/global";
import { TCategory } from "@/types/categoryTypes";
import { TProduct } from "@/types/productType";

// Define product size enum in zod
const productSizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]);

// Define product validation schema with all fields optional
export const addProductValidation = z.object({
  name: z.string().optional(),
  shortDescription: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  size: z.array(productSizeEnum).optional(),
});

const UpdateProduct = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [updateProduct] = useUpdateProductMutation();

  // Jodit Editor value
  const [longDescription, setLongDescription] = useState("");
  const [longDescError, setLongDescError] = useState("");
  const editor = useRef(null);

  const { data: p } = useGetSingleProductQuery({ productId: params.id });
  const product = p as TResponse<TProduct>;

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
  const { data: categoryRes, isLoading } = useGetCategoriesQuery({ limit: 99999 });
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
    if (newFileList.length <= 4) {
      setSecondaryImages(newFileList);
    } else {
      ErrorResponse({ message: "You can only upload up to 4 secondary images." });
    }
  };

  const beforeSecondaryImageUpload = () => {
    if (secondaryImages.length >= 4) {
      ErrorResponse({ message: "You can only upload up to 4 secondary images." });
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

    const updatedData = {
      ...data,
      quantity: data?.quantity ? Number(data?.quantity) : undefined,
      price: data?.price ? Number(data?.price) : undefined,
      colorsPreferences: colors?.length ? colors.map((clr) => clr.hex) : [],
      size: data.size || [],
      shortDescription: data?.shortDescription,
      description: longDescription,
    };

    const toastId = toast.loading("Updating product...");

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
      await updateProduct({
        productId: params.id,
        data: formData,
      }).unwrap();

      toast.success("Product updated successfully", {
        id: toastId,
        duration: 2000,
      });

      router.push("/admin/products");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const defaultValues = {
    name: product?.data?.name || "",
    shortDescription: product?.data?.shortDescription || "",
    price: product?.data?.price || "",
    quantity: product?.data?.quantity || "",
    size: product?.data?.size || [],
    category: product?.data?.category || "",
  };

  useEffect(() => {
    if (product) {
      setLongDescription(product?.data?.description || "");
      setColors(
        product?.data?.colorsPreferences?.map((clr, index) => ({
          key: index + 1,
          hex: clr,
        })) || [],
      );

      // Ensure `primaryImage` has a valid URL string
      if (product?.data?.primaryImage && typeof product.data.primaryImage === "string") {
        setPrimaryImage([
          {
            uid: "-1",
            name: "Primary Image",
            status: "done",
            url: product.data.primaryImage, // Ensure this is a valid string
          },
        ]);
      }

      // Ensure each `secondaryImage` has a valid URL string
      if (product?.data?.images && Array.isArray(product.data.images)) {
        setSecondaryImages(
          product.data.images.map((img, index) => ({
            uid: `${index}`,
            name: `Image ${index + 1}`,
            status: "done",
            url: typeof img?.url === "string" ? img?.url : "", // Ensure the URL is a valid string
          })),
        );
      }
    }
  }, [product]);

  console.log({ secondaryImages });

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <EForm
                onSubmit={onSubmit}
                resolver={zodResolver(addProductValidation)}
                defaultValues={defaultValues}
              >
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
                    }}
                    onBlur={(newContent) => setLongDescription(newContent)}
                  />
                  {longDescError && <p style={{ color: "red" }}>{longDescError}</p>}
                </div>

                <ESelect
                  name='category'
                  defaultValue={product?.data?.category}
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
                  mode='multiple'
                  options={sizeOptions}
                  defaultValue={product?.data?.size || []}
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
              Update
            </Button>
            <Button className='w-1/2 bg-white h-[44px] text-black font-500 text-20'>Cancel</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateProduct;
