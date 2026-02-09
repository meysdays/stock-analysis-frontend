interface CardProps {
  title?: string;
  value?: string | number;
  toolTip?: string;
}

const SideBarCard = ({ title, value }: CardProps) => {
  return (
    <div className="flex-1 bg-white p-2 rounded-lg  border border-gray-300 flex flex-col justify-center items-center mb-2">
      <div className="flex  ">
        <h3 className="text-[12px] text-gray-500 font-bold">{title}</h3>
        {/* <span className="text-gray-400 text-sm" title={toolTip}>
          ?
        </span> */}
      </div>

      <p className="text-xl  font-bold ">{value}</p>
    </div>
  );
};

export default SideBarCard;
