import { Link } from "react-router-dom";
import AdminPanelTitle from "../../components/AdminPanelTitle";
import PendingCart from "../../components/adminPanel/PendingCart";
import ReportCart from "./ReportCart";
import { TbExternalLink } from "react-icons/tb";
import { useGetAdminSiteDataQuery } from "../../../redux/features/api/admin-panel/adminDataApi";

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
  const {
    data: { messageData: [data = {}] = [] } = { messageData: [] },
    isLoading,
  } = useGetAdminSiteDataQuery();

  return (
    <div className="px-8 pt-6 pb-10">
      <h2 className="font-medium text-3xl text-[#081257] pb-6 pt-8">
        Admin Panel
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center" >
        {/* cart */}

        <PendingCart
          title="Pending Group Approvals"
          value={data?.pendingGroupApprovals || 0}
          href={"/traders-community/all-membership-request"}
          target="_blank"
        />

        <PendingCart
          title="Pending Tickets"
          value={data?.pendingTickets || 0}
          href={"/admin-panel/fluent-support/dashboard"}
        />

        <PendingCart
          title="Pending Withdrawal Approvals"
          value={data?.monthlywithdrawals || 0}
          href={"/all-withdrawal-request"}
        />

        <PendingCart
          title="Pending Email Activation"
          value={data?.pendingEmailActivation || 0}
          href={"/admin-panel/users/all-users"}
        />

        <PendingCart
          title="Pending Course Approvals"
          value={data?.pendingCourseApprovals || 0}
          href={"/admin-panel/tutor/Courses"}
        />

        <PendingCart
          title="Pending Channel Approvals"
          value={data?.pendingChannelApprovals || 0}
          href={"/traders-community/all-membership-request"}
          target="_blank"
        />

        <PendingCart
          title="Company Income"
          value={`$ ${data?.companyIncom || 0}`}
          href={"/company-income"}
          target="_blank"
        />

        <PendingCart
          title="Royalty Income"
          value={`$ ${data?.royaltyIncom || 0}`}
          href={"/royalty-income"}
          target="_blank"
        />
      </div>

      {/* Reports */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
        {/* cart */}
        <ReportCart
          report="Daily"
          activations={data?.dailyActivations || 0}
          turnover={data?.dailyTurnover || 0}
          withdrawals={data?.dailywithdrawals || 0}
          withdrawalsAmount={data?.dailyWithdrawalAmount || 0}
        />

        <ReportCart
          report="Weekly"
          activations={data?.weeklyActivations || 0}
          turnover={data?.weeklyTurnover || 0}
          withdrawals={data?.weeklywithdrawals || 0}
          withdrawalsAmount={data?.weeklyWithdrawalAmount || 0}
        />

        <ReportCart
          report="Monthly"
          activations={data?.monthlyActivations || 0}
          turnover={data?.monthlyTurnover || 0}
          withdrawals={data?.monthlywithdrawals || 0}
          withdrawalsAmount={data?.monthlyWithdrawalAmount || 0}
        />

        <OverlaReport
          activeUsers={data?.activeUsers || 0}
          inActiveUsers={data?.inactiveUsers || 0}
          totalRegisters={data?.totalRegisteredUsers || 0}
        />

        <QuickLinks />
      </div>
    </div>
  );
};

export default AdminPanel;

const OverlaReport = ({ activeUsers, inActiveUsers, totalRegisters }) => {
  return (
    <div>
      <h4 className="text-[#081257] font-semibold text-2xl mb-2">
        Overal Reports
      </h4>
      <div className="w-full flex items-start h-[230px] px-1 py-2.5 max-w-[320px] bg-[#081257] rounded">
        <ul className="w-full">
          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Total Registered Users
            </Link>

            <span className="text-[#f3b66b] font-bold">{totalRegisters}</span>
          </li>

          <li className="flex items-center justify-between text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Active Users
            </Link>

            <span className="text-[#f3b66b] font-bold">{activeUsers}</span>
          </li>

          <li className="flex items-center justify-between text-base px-2.5 py-2.5">
            <Link
              className="text-white max-w-[80%] flex items-center gap-1"
              to="#"
            >
              Inactive Users
            </Link>

            <span className="text-[#f3b66b] font-bold">{inActiveUsers}</span>
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
      <div className="w-full flex h-[230px] px-1 py-2.5 max-w-[320px] bg-[#081257] rounded">
        <ul className="w-full">
          <li className="text-base border-b w-full border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="/traders-community/groups"
            >
              Create Signal Channel
              <TbExternalLink size={18} />
            </Link>
          </li>

          <li className="text-base border-b border-b-[#ffffff26] px-2.5 py-2.5">
            <Link
              className="text-white hover:underline w-fulll flex items-center gap-1"
              to="/traders-community/groups"
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
              to="/traders-community/groups"
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
