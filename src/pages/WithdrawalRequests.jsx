import React from "react";
import HeroTemp from "../components/HeroTemp";
import { useParams } from "react-router-dom";
import MainBannerTitle from "../common/MainBannerTitle";
import Footer from "../components/Footer";
import { MaterialReactTable } from "material-react-table";

const columns = [
  { accessorKey: "username", header: "Username" },
  { accessorKey: "requestedAmount", header: "Requested Amount" },
  { accessorKey: "address", header: "User Address" },
  { accessorKey: "withdrawalDate", header: "Withdrawal Date" },
  { accessorKey: "proofOfDisbursement", header: "Proff of disbursement" },
  { accessorKey: "adminCharges", header: "Admin Charges" },
  { accessorKey: "disbursedAmount", header: "Disbursed Amount" },
  { accessorKey: "action", header: "Action" },
];

const WithdrawalRequests = () => {
  const params = useParams();
  const subRoute = params["*"];

  return (
    <>
      <div className="text-white">
        <HeroTemp>
          <MainBannerTitle
            title="All Withdrawal Requests"
            subRoute={subRoute}
          />
        </HeroTemp>
      </div>
      <div className="container mx-auto py-4">
        <div className="container mx-auto py-4">
          <MaterialReactTable columns={columns} data={["amir"]} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WithdrawalRequests;
