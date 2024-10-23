import { Image } from "antd";
import moment from "moment";

const OwnerMsgCard = ({
  message,
  createdAt,
  file,
}: {
  message: string;
  createdAt: string;
  file: string[];
}) => {
  return (
    <div className='space-y-2 flex flex-col items-end relative'>
      <p className='text-xs px-3'>{moment(createdAt).format("hh:mm A")}</p>
      {message ? (
        <div className='max-w-max rounded-xl border bg-primaryBlack text-white px-3 py-2'>
          <p className='text-primaryWhite'>{message}</p>
        </div>
      ) : (
        ""
      )}
      {file?.length ? (
        <>
          <div className='grid gap-2 w-full relative'>
            {file.length > 1 ? (
              <p className='absolute top-0 right-0 bg-black/10 px-2 z-10 py-1 rounded-bl-lg text-xs'>
                Attachment {file.length}
              </p>
            ) : (
              ""
            )}
            <Image.PreviewGroup items={file}>
              <Image src={file[0]} alt='image' className='max-h-[300px] w-auto' />
            </Image.PreviewGroup>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default OwnerMsgCard;
