import { GiWallet } from "react-icons/gi";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Withdrawals = () => {
  return (
    <div>
      <h2 className="my-4 text-white text-xl">Withdrawals</h2>
      <div className="mt-8">
        <div className="border border-gray-300 flex items-center gap-4 rounded-lg p-3">
          <div className="bg-blue-light p-4 w-max rounded-full">
            <GiWallet className="text-gold-light_400" size={30} />
          </div>
          <div className="text-gray-500 text-lg leading-8">
            <p>
              Current Balance is $<span className="text-white">0.00</span>
            </p>
            <p>
              You have $<span className="text-white">0.00</span> and this is
              insufficient balance to withdraw
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 text-white text-base">
          <AiOutlineExclamationCircle className="text-white" size={20} />
          <p>
            You can change your
            <Link
              to="/user-profile/settings/withdraw"
              className="text-gold-light_400 mx-1"
            >
              withdraw preference
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
