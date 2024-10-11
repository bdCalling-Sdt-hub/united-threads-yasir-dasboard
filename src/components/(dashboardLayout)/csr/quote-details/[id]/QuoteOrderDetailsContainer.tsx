/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Button, ColorPicker, Form, InputNumber, Select, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { TbMessage } from "react-icons/tb";
import rgbHex from "rgb-hex";
import Swal from "sweetalert2";

// Import necessary types
import generatePantoneColor from "@/lib/utils/convertHexToPanton";
import { useGetSingleQuoteQuery, useUpdateQuoteMutation } from "@/redux/api/quoteApi";
import { TResponse } from "@/types/global";
import { TQuote } from "@/types/quoteTypes";

type FieldType = {
  category: string;
  size: string;
  color: string;
  quantity: number;
  materialPreference: string;
  price: number;
};

const QuoteOrderDetailsContainer = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleQuoteQuery({ quoteId: id });
  const quote = (data as TResponse<TQuote>)?.data;
  const user = quote?.user;

  const [pantoneColor, setPantoneColor] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(quote?.hexColor || "#000000"); // Initial color

  const [updateQuote] = useUpdateQuoteMutation();
  const router = useRouter();

  // Update Pantone color whenever selected color changes
  //useEffect(() => {
  //  if (selectedColor) {
  //    const pantoneColorObject = new simpleColorConverter({
  //      hex6: selectedColor,
  //      to: "pantone",
  //    });
  //    setPantoneColor(pantoneColorObject?.color || "Unknown Pantone");
  //  }
  //}, [selectedColor]);

  const handleColorChange = (css: string) => {
    // convert rgb to hex

    const hex = rgbHex(css);
    const panton = generatePantoneColor(`#${hex}`);
    setPantoneColor(panton.pantone);
    setSelectedColor(hex); // Ensure this is a valid string (hex color like #ff0000)
  };

  const onFinish = (values: FieldType) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this quote?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            quoteStatus: "processing",
            hexColor: selectedColor,
            materialPreferences: values.materialPreference,
            price: values.price,
            quantity: values.quantity,
          };

          const formData = new FormData();
          formData.append("data", JSON.stringify(payload));

          const res = await updateQuote({
            quoteId: id,
            data: formData,
          }).unwrap();

          if (res?.success) {
            Swal.fire({
              title: "Accepted!",
              text: "The quote has been accepted.",
              icon: "success",
            }).then(() => {
              router.replace("/csr/quote-details");
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: res?.message,
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div>
          <div className='flex justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <p className='text-xl font-bold'>Quote ID: #{quote?._id}</p>
              </div>
              <div className='flex items-center gap-3 mt-3 mb-5'>
                <LuCalendarDays className='w-6 h-6' />
                <p className='text-md'>{moment(quote?.createdAt).format("MMM Do, YYYY")}</p>
              </div>
              <Link href={"/message/userName"}>
                <Button size='large' icon={<TbMessage />}>
                  Message
                </Button>
              </Link>
            </div>
            <div className='flex gap-3'>
              <CiUser className='w-12 h-12 rounded-md bg-primaryBlack text-primaryWhite py-2 px-2' />
              <div>
                <h2 className='text-xl font-bold mb-3'>Retailer</h2>
                <p className='mb-2'>
                  Full Name: {user?.firstName} {user?.lastName}
                </p>
                <p className='mb-2'>Email: {user?.email}</p>
                <p className='mb-2'>Phone: {user?.contact}</p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div>
            <Form
              layout='vertical'
              onFinish={onFinish}
              initialValues={{
                category: quote?.category?.name,
                size: quote?.size,
                color: quote?.hexColor,
                quantity: quote?.quantity,
                materialPreference: quote?.materialPreferences,
                price: quote?.price,
              }}
            >
              <div className='space-y-5'>
                <div className='flex justify-between'>
                  <div className='lg:w-1/3 w-full'>
                    <Form.Item label='Category' name='category'>
                      <Select size='large' disabled />
                    </Form.Item>

                    <Form.Item label='Size' name='size'>
                      <Select
                        size='large'
                        placeholder='Please Select a size'
                        options={[
                          { value: "S", label: "S" },
                          { value: "M", label: "M" },
                          { value: "L", label: "L" },
                          { value: "XL", label: "XL" },
                          { value: "XXL", label: "XXL" },
                        ]}
                      />
                    </Form.Item>

                    <div className='flex gap-x-5'>
                      <div className='border-r-2 pr-5'>
                        <Form.Item label='Color' name='color'>
                          <ColorPicker
                            size='large'
                            onChange={(value, css) => handleColorChange(css)}
                            value={selectedColor.toString()}
                          />
                        </Form.Item>
                      </div>

                      <div>
                        <h1 className='text-lg'>Pantone code</h1>
                        <p className='mt-2 text-lg'>{pantoneColor}</p>
                      </div>
                    </div>

                    <Form.Item label='Quantity' name='quantity'>
                      <InputNumber
                        size='large'
                        style={{ width: "100%" }}
                        placeholder='Please input quantity'
                      />
                    </Form.Item>

                    <Form.Item label='Materials Preference' name='materialPreference'>
                      <TextArea rows={4} placeholder='Write here...' />
                    </Form.Item>
                  </div>

                  <div className='lg:w-1/3 w-full'>
                    <Form.Item label='Price' name='price'>
                      <InputNumber
                        size='large'
                        style={{ width: "100%" }}
                        placeholder='Please input quantity'
                      />
                    </Form.Item>
                    <div className='flex gap-4'>
                      <div className='flex flex-col gap-1 justify-center items-center'>
                        <Image
                          src={quote?.frontSide}
                          alt='productImage'
                          className='border border-black px-4 py-8 h-full max-h-[300px] w-auto rounded-md'
                          width={300}
                          height={300}
                        />
                        <figcaption className='text-[#00B047] text-xl font-medium'>
                          Front Side
                        </figcaption>
                      </div>
                      <div className='flex flex-col gap-1 justify-center items-center'>
                        <Image
                          src={quote?.backSide}
                          alt='productImage'
                          className='border border-black px-4 py-8 h-full max-h-[300px] w-auto rounded-md'
                          width={300}
                          height={300}
                        />
                        <figcaption className='text-[#00B047] text-xl font-medium'>
                          Back Side
                        </figcaption>
                      </div>
                    </div>
                  </div>
                </div>
                <Button htmlType='submit' block size='large'>
                  Quote Accept
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteOrderDetailsContainer;
