import { useState } from "react";
import BankTransfer from "./BankTransfer";
import ECheck from "./ECheck";
import PayPal from "./PyaPal";
import USDT from "./USDT";

const Withdraw = () => {
  const [withdrawMethod, setWithdrawMethod] = useState("banktransfer");
  return (
    <div>
      <div className="w-full max-w-3xl">
        <h4 className="text-white my-3 text-xl font-medium">
          Select a withdraw method
        </h4>
        <div>
          <div className="flex flex-col gap-2 mb-3">
            <div className="grid grid-col1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              <label
                htmlFor="banktransfer"
                className="flex items-center justify-center w-full max-w-[340px] border bg-white text-gray-800 px-3 py-4 rounded-lg cursor-pointer gap-4"
              >
                <input
                  name="banktransfer"
                  id="banktransfer"
                  checked={withdrawMethod === "banktransfer"}
                  onChange={() => setWithdrawMethod("banktransfer")}
                  value="banktransfer"
                  type="radio"
                  className="scale-150 border-none outline-none"
                />
                <div className="leading-[18px]">
                  <h3>Bank Transfer</h3>
                  <span className="text-gray-500 text-xs">
                    Min withdraw $80.00
                  </span>
                </div>
              </label>
              <label
                htmlFor="echeck"
                className="flex items-center justify-center w-full max-w-[340px] border bg-white text-gray-800 px-3 py-4 rounded-lg cursor-pointer gap-4"
              >
                <input
                  name="echeck"
                  id="echeck"
                  checked={withdrawMethod === "echeck"}
                  onChange={() => setWithdrawMethod("echeck")}
                  value="echeck"
                  type="radio"
                  className="scale-150 border-none outline-none"
                />
                <div className="leading-[18px]">
                  <h3>E - Check</h3>
                  <span className="text-gray-500 text-xs">
                    Min withdraw $80.00
                  </span>
                </div>
              </label>

              <label
                htmlFor="paypal"
                className="flex items-center justify-center w-full max-w-[340px] border bg-white text-gray-800 px-3 py-4 rounded-lg cursor-pointer gap-4"
              >
                <input
                  name="paypal"
                  id="paypal"
                  checked={withdrawMethod === "paypal"}
                  onChange={() => setWithdrawMethod("paypal")}
                  value="paypal"
                  type="radio"
                  className="scale-150 border-none outline-none"
                />
                <div className="leading-[18px]">
                  <h3>PayPal</h3>
                  <span className="text-gray-500 text-xs">
                    Min withdraw $80.00
                  </span>
                </div>
              </label>
              <label
                htmlFor="usdt"
                className="flex items-center justify-center w-full max-w-[340px] border bg-white text-gray-800 px-3 py-4 rounded-lg cursor-pointer gap-4"
              >
                <input
                  name="usdt"
                  id="usdt"
                  checked={withdrawMethod === "usdt"}
                  onChange={() => setWithdrawMethod("usdt")}
                  value="usdt"
                  type="radio"
                  className="scale-150 border-none outline-none"
                />
                <div className="leading-[18px]">
                  <h3>USDT</h3>
                  <span className="text-gray-500 text-xs">
                    Min withdraw $80.00
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="pr-0">
            {withdrawMethod === "banktransfer" ? (
              <BankTransfer />
            ) : withdrawMethod === "echeck" ? (
              <ECheck />
            ) : withdrawMethod === "paypal" ? (
              <PayPal />
            ) : withdrawMethod === "usdt" ? (
              <USDT />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
