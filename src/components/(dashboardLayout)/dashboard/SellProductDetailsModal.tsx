"use client";
import { Divider,  Modal } from "antd";
import productImage from "@/assets/image/hoddieImage.png";
import Image from "next/image";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const productSize = ["S", "M", "Xl"];

const SellProductDetailsModal = ({ open, setOpen }: TPropsType) => {
  return (
    <>
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
          <h4 className="text-center text-2xl font-medium">Product Details</h4>
          <div className="mt-5">
            <Image
              src={productImage}
              alt="image"
              width={1900}
              height={1000}
              className="w-full h-44 object-fill"
            />
            <div className="mt-10">
              <div className="flex justify-between">
                <h4>Product Name :</h4>
                <p className="font-medium">Hoodie</p>
              </div>
              <Divider></Divider>
              <div className="flex justify-between">
                <h4>Size:</h4>
                <div>
                  {productSize.map((s: string, inx: number) => (
                    <span
                      key={inx}
                      className=" bg-slate-200 p-1 rounded-md text-black m-1 uppercase"
                    >
                      {s}
                    </span>
                  ))}
                  <p className="font-medium"></p>
                </div>
              </div>
              <Divider></Divider>
              <div className="flex justify-between">
                <h4>Price :</h4>
                <p className="font-medium">$150</p>
              </div>
              <Divider></Divider>
              <div className="flex justify-between">
                <h4>Quantity :</h4>
                <p className="font-medium">5</p>
              </div>
              <Divider></Divider>
              <div className="flex justify-between">
                <h4>Total Price :</h4>
                <p className="font-medium">$750</p>
              </div>
            </div>
          </div>
          {/* action button */}
        </div>
      </Modal>
    </>
  );
};

export default SellProductDetailsModal;
