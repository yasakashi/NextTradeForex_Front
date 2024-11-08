import { PiWarningCircle } from "react-icons/pi";

const WarningComponent = ({ description , className="" }) => {
  return (
    <div className="flex items-start my-2 space-x-2">
      <PiWarningCircle size={24} className="text-gray-500 shrink-0" />
      <p className={`text-sm text-gray-500 ${className}`}>{description}</p>
    </div>
  );
};

export default WarningComponent;
