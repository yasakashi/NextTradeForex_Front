import React from "react";
import HeroTemp from "../components/HeroTemp";
import { useParams } from "react-router-dom";
import MainBannerTitle from "../common/MainBannerTitle";
import Footer from "../components/Footer";
import { MaterialReactTable } from "material-react-table";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "userType", header: "User Type" },
  { accessorKey: "royaltyIncome", header: "Royalty Income" },
  { accessorKey: "incomeDate", header: "Income Date" },
];

const data = [];

const RoyalityIncome = () => {
  const params = useParams();
  const subRoute = params["*"];

  return (
    <>
      <div className="text-white">
        <HeroTemp>
          <MainBannerTitle title="Royalty Income" subRoute={subRoute} />
        </HeroTemp>
      </div>
      <div className="container mx-auto mt-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CardItem title="Total Income" amount="0" price="0.00" />
          <CardItem title="Daily Income" amount="0" price="0.00" />
          <CardItem title="Weekly Income" amount="0" price="0.00" />
          <CardItem title="Monthly Income" amount="0" price="0.00" />
        </div>

        <div className="container mx-auto">
          <MaterialReactTable columns={columns} data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoyalityIncome;

const CardItem = ({ title, amount, price }) => {
  return (
    <div className="bg-[#0e1640] shadow-md leading-10 text-center text-white rounded border border-[#bb914a2e] p-5">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="space-x-1 text-base font-medium">
        <span>{amount}</span>
        <span>/</span>
        <span>$ {price}</span>
      </div>
    </div>
  );
};
