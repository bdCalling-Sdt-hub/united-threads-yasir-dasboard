"use client";
import { Modal, Tooltip, Button, ColorPicker, Upload, Spin } from "antd";
import { useEffect, useState } from "react";
import { PiUploadLight } from "react-icons/pi";
import { PlusSquareFilled } from "@ant-design/icons";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/categoryTypes";
import { TResponse } from "@/types/global";
import EForm from "@/components/Form/FormProvider";
import EInput from "@/components/Form/ResInput";
import ESelect from "@/components/Form/ResSelect";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateQuoteProductMutation } from "@/redux/api/quoteProductApi";
import { toast } from "sonner";
import { TQuoteProduct } from "@/types/quoteProductTypes";

// Define validation schema in zod
export const addQuoteProductValidation = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  size: z.array(z.string()).optional(),
  stock: z.string().min(1, { message: "Stock must be greater than 0" }),
});

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
  quoteProduct: TQuoteProduct;
};

const UpdateQuoteProductModal = ({ open, setOpen, quoteProduct }: TPropsType) => {
  const [colors, setColors] = useState<any[]>([]);
  const [frontSideImage, setFrontSideImage] = useState<any[]>([]);
  const [backSideImage, setBackSideImage] = useState<any[]>([]);
  const [additionalImages, setAdditionalImages] = useState<any[]>([]);
  const [defaultValues, setDefaultValues] = useState<any>({});
  const [updateQuoteProduct, { isLoading }] = useUpdateQuoteProductMutation();

  // Size options
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => ({
    label: size,
    value: size,
  }));

  // Fetch categories
  const { data: categoryRes, isLoading: categoryLoading } = useGetCategoriesQuery({ limit: 99999 });
  const categories = categoryRes as TResponse<TCategory[]>;

  // Handle color selection
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

  // Handle image uploads
  const handleFrontSideImageChange = ({ fileList: newFileList }: any) => {
    setFrontSideImage(newFileList.slice(-1)); // Only one image
  };

  const handleBackSideImageChange = ({ fileList: newFileList }: any) => {
    setBackSideImage(newFileList.slice(-1)); // Only one image
  };

  const handleAdditionalImagesChange = ({ fileList: newFileList }: any) => {
    setAdditionalImages(newFileList); // Multiple images
  };

  // Submit form data
  const onSubmit = async (data: any) => {
    if (!frontSideImage.length || !backSideImage.length) {
      toast.error("Both front side and back side images are required.");
      return;
    }

    const formData = new FormData();
    const payload = {
      name: data.name,
      colorsPreferences: colors.length ? colors.map((clr) => clr.hex) : [],
      category: data.category,
      size: data.size,
      stock: Number(data.stock),
    };
    formData.append("data", JSON.stringify(payload));
    formData.append("frontSide", frontSideImage[0]?.originFileObj);
    formData.append("backSide", backSideImage[0]?.originFileObj);
    additionalImages.forEach((image: any) => {
      formData.append("images", image.originFileObj);
    });

    try {
      const res = await updateQuoteProduct({
        productId: quoteProduct._id,
        data: formData,
      }).unwrap();
      setOpen(false);
      if (res?.data?.success) {
        toast.success(res.message);
        setColors([]);
        setFrontSideImage([]);
        setBackSideImage([]);
        setAdditionalImages([]);
        setOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (quoteProduct) {
      // Populate colors, images, and default values
      setColors(
        quoteProduct.colorsPreferences.map((clr, index) => ({
          key: index + 1,
          hex: clr,
        })),
      );
      setFrontSideImage([{ uid: "-1", url: quoteProduct.frontSide }]); // Ensure uid is unique
      setBackSideImage([{ uid: "-1", url: quoteProduct.backSide }]); // Ensure uid is unique
      setAdditionalImages(quoteProduct.images || []);

      setDefaultValues({
        name: quoteProduct?.name || "",
        category: quoteProduct?.category?._id || "", // Ensure this is the correct field
        size: quoteProduct?.size || [], // Ensure it's an array
        stock: quoteProduct?.stock?.toString() || "",
      });
    }
  }, [quoteProduct]);

  const initialValues = {
    name: quoteProduct?.name || "",
    category: quoteProduct?.category?._id || "",
    size: quoteProduct?.size || [],
    stock: quoteProduct?.stock?.toString() || "",
  };

  console.log(initialValues, "initial values");

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
        <div className='mt-2'>
          {categoryLoading ? (
            <Spin></Spin>
          ) : (
            <EForm
              onSubmit={onSubmit}
              resolver={zodResolver(addQuoteProductValidation)}
              defaultValues={initialValues} // Pass default values
              key={colors.length}
            >
              {/* Product Name */}
              <EInput
                type='text'
                label='Product Name'
                placeholder='Enter Product Name'
                name='name'
                size='large'
              />

              {/* Category */}
              <ESelect
                label='Category'
                name='category'
                options={
                  categories?.data?.length
                    ? categories.data.map((category: TCategory) => ({
                        value: category._id,
                        label: category.name,
                      }))
                    : []
                }
                placeholder='Select Category'
                size='large'
              />

              {/* Select Colors */}
              <div>
                <label htmlFor='colors' className='text-lg'>
                  Select Colors (Optional)
                </label>

                <div className='flex items-center gap-x-4 my-2'>
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

              {/* Size */}
              <ESelect
                label='Size'
                name='size'
                options={sizeOptions}
                placeholder='Select size'
                size='large'
                mode='multiple'
                defaultValue={defaultValues.size} // Ensure default values are set
              />

              <EInput
                type='number'
                label='Stock'
                name='stock'
                size='large'
                placeholder='Enter Stock'
              />

              {/* Front Side Image Upload */}
              <div className='mt-4'>
                <p className='text-lg mb-2'>Upload Front Side Image</p>
                <Upload
                  name='frontSide'
                  listType='picture'
                  fileList={frontSideImage}
                  beforeUpload={() => false}
                  onChange={handleFrontSideImageChange}
                >
                  <div className='border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer'>
                    <PiUploadLight size={40} />
                    <p>Upload Front Side Image</p>
                  </div>
                </Upload>
              </div>

              {/* Back Side Image Upload */}
              <div className='mt-4'>
                <p className='text-lg mb-2'>Upload Back Side Image</p>
                <Upload
                  name='backSide'
                  listType='picture'
                  fileList={backSideImage}
                  beforeUpload={() => false}
                  onChange={handleBackSideImageChange}
                >
                  <div className='border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer'>
                    <PiUploadLight size={40} />
                    <p>Upload Back Side Image</p>
                  </div>
                </Upload>
              </div>

              {/* Additional Images Upload */}
              <div className='mt-4'>
                <p className='text-lg mb-2'>Upload Additional Images</p>
                <Upload
                  name='images'
                  listType='picture'
                  fileList={additionalImages}
                  multiple
                  beforeUpload={() => false}
                  onChange={handleAdditionalImagesChange}
                >
                  <div className='border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer'>
                    <PiUploadLight size={40} />
                    <p>Upload Additional Images</p>
                  </div>
                </Upload>
              </div>

              {/* Submit Button */}
              <Button
                htmlType='submit'
                loading={isLoading}
                block
                size='large'
                className='mt-4 bg-primary text-white'
              >
                Submit
              </Button>
            </EForm>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateQuoteProductModal;
