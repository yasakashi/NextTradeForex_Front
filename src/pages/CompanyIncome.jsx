import React from "react";
import HeroTemp from "../components/HeroTemp";
import { useParams } from "react-router-dom";
import MainBannerTitle from "../common/MainBannerTitle";
import Footer from "../components/Footer";
import { MaterialReactTable } from "material-react-table";

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "productName", header: "Product Name" },
  { accessorKey: "productType", header: "Product Type" },
  { accessorKey: "companyIncome", header: "Company Income" },
  { accessorKey: "incomeDate", header: "Income Date" },
];

const data = [
  {
    id: 1,
    name: "Jayant False",
    productName: "Tradingbench",
    productType: "Group purchase",
    companyIncome: "$ 5.0",
    incomeDate: "18 Mar, 2024",
  },

  {
    id: 2,
    name: "Himansu Sekhar pradhan",
    productName: "Tradingbench",
    productType: "Group purchase",
    companyIncome: "$ 5.0",
    incomeDate: "13 Feb, 2024",
  },
];

const CompanyIncome = () => {
  const params = useParams();
  const subRoute = params["*"];

  return (
    <>
      <div className="text-white">
        <HeroTemp>
          <MainBannerTitle title="Company Income" subRoute={subRoute} />
        </HeroTemp>
      </div>
      <div className="container mx-auto mt-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <CardItem title="Total Income" amount="14" price="174.00" />
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

export default CompanyIncome;

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
