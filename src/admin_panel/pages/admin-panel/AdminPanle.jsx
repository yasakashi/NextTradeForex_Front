import { Link } from "react-router-dom";
import AdminPanelTitle from "../../components/AdminPanelTitle";
import PendingCart from "../../components/adminPanel/PendingCart";
import ReportCart from "./ReportCart";
import { TbExternalLink } from "react-icons/tb";

const pendingData = [
  {
    title: "Pending Group Approvals",
    value: 1,
    href: "#",
  },

  {
    title: "Pending Tickets",
    value: 1,
    href: "#",
  },
  {
    title: "Pending Withdrawal Approvals",
    value: 0,
    href: "#",
  },

  {
    title: "Pending Email Verification",
    value: 1,
    href: "#",
  },

  {
    title: "Pending Course Approvals",
    value: 1,
    href: "#",
  },

  {
    title: "Pending Channel Approvals",
    value: 1,
    href: "#",
  },

  {
    title: "Company Income",
    value: "$174.000",
    href: "#",
  },

  {
    title: "Royalty Income",
    value: "$0.00",
    href: "#",
  },
];

const AdminPanel = () => {
  return (
    <div className="px-8 pt-6 pb-10">
      <h2 className="font-medium text-3xl text-[#081257] pb-6 pt-8">
        Admin Panel
      </h2>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* cart */}
        {pendingData?.map((item, index) => (
          <PendingCart item={item} key={index} />
        ))}
      </div>

      {/* Reports */}

      <div className="grid lg:grid-cols-4 gap-4 mt-20">
        {/* cart */}
        <ReportCart
          report="Daily"
          activations="0"
          turnover="0.00"
          withdrawals="0"
          withdrawalsAmount="0"
        />

        <ReportCart
          report="Weekly"
          activations="0"
          turnover="0.00"
          withdrawals="0"
          withdrawalsAmount="0"
        />

        <ReportCart
          report="Monthly"
          activations="0"
          turnover="0.00"
          withdrawals="0"
          withdrawalsAmount="0"
        />

        <OverlaReport />

        <QuickLinks />
      </div>
    </div>
  );
};

export default AdminPanel;

const OverlaReport = () => {
  return (
    <div>
      <h4 className="text-[#081257] font-semibold text-2xl mb-2">
        Overal Reports
      </h4>
      <div className="w-full flex items-start h-[230px] px-1 py-2.5 max-w-[520px] bg-[#081257] rounded">
        <ul>
          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Total Registered Users
            </Link>

            <span className="text-[#f3b66b] font-bold">88</span>
          </li>

          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Active Users
            </Link>

            <span className="text-[#f3b66b] font-bold">4</span>
          </li>

          <li className="flex items-center justify-between text-base px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Inactive Users
            </Link>

            <span className="text-[#f3b66b] font-bold">84</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <div>
      <h4 className="text-[#081257] font-semibold text-2xl mb-2">
        Quick Links
      </h4>
      <div className="w-full flex h-[230px] px-1 py-2.5 max-w-[520px] bg-[#081257] rounded">
        <ul>
          <li className="text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="/traders-community/create-signal-channel/2"
            >
              Create Signal Channel
              <TbExternalLink size={18} />
            </Link>
          </li>

          <li className="text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="/traders-community/groups/:name/create-signal"
            >
              Create Signal
              <TbExternalLink size={18} />
            </Link>
          </li>

          <li className="text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="#"
            >
              All Signal Channels
              <TbExternalLink size={18} />
            </Link>
          </li>

          <li className="text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="#"
            >
              All Signals
              <TbExternalLink size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
