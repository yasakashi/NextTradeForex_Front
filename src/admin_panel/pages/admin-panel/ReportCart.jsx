import { Link } from "react-router-dom";
import { TbExternalLink } from "react-icons/tb";

const ReportCart = ({
  report,
  activations,
  turnover,
  withdrawals,
  withdrawalsAmount,
}) => {
  return (
    <div>
      <h4 className="text-[#081257] font-semibold text-2xl mb-2">
        {report} Reports
      </h4>
      <div className="w-full flex items-center h-[230px] px-1 py-2.5 max-w-[520px] bg-[#081257] rounded">
        <ul>
          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              {report} Activations
              <TbExternalLink size={18} />
            </Link>

            <span className="text-[#f3b66b] font-bold">{activations}</span>
          </li>

          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              {report} Turnover
              <TbExternalLink size={18} />
            </Link>

            <span className="text-[#f3b66b] font-bold">${turnover}</span>
          </li>

          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              {report} Withdrawals
            </Link>

            <span className="text-[#f3b66b] font-bold">{withdrawals}</span>
          </li>

          <li className="flex items-center justify-between text-base px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              {report} Withdrawal Amount
            </Link>

            <span className="text-[#f3b66b] font-bold">
              ${withdrawalsAmount}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReportCart;
