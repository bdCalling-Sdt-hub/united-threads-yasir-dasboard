import { Divider, Modal } from "antd";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

const EaringDetaisModal = ({ open, setOpen }: TPropsType) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      style={{
        minWidth: "max-content",
        position: "relative"
      }}
    >
      <div className="pb-20">
        <h4 className="text-center text-2xl font-medium" >Transaction Details</h4>
        <div className="mt-10">
            <div className="flex justify-between">
                <h4>Transaction ID :  :</h4>
                <p className="font-medium">#12345678</p>
            </div>
           <Divider></Divider>
           <div className="flex justify-between">
                <h4>Date : </h4>
                <p className="font-medium">01-24-2024</p>
            </div>
           <Divider></Divider>
           <div className="flex justify-between">
                <h4>A/C number :</h4>
                <p className="font-medium">***  ****  ****  *545</p>
            </div>
           <Divider></Divider>
           <div className="flex justify-between">
                <h4>Transaction amount :</h4>
                <p className="font-medium">$260</p>
            </div>
           <Divider></Divider>
           <div className="flex justify-between">
                <h4> Buyer  name :</h4>
                <p className="font-medium">John doe</p>
            </div>
        </div>
      </div>
    </Modal>
  );
};

export default EaringDetaisModal;