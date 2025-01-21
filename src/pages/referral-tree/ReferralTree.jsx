import MainBannerTitle from "../../common/MainBannerTitle";
import HeroTemp from "../../components/HeroTemp";
import { useGetUserReferralsQuery } from "../../redux/features/api/referral/userReferralApi";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";
import { FaSquareCheck } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

const ReferralTree = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: { messageData: referralTreeData } = { messageData: [] },
    isLoading,
  } = useGetUserReferralsQuery({
    data: { username: user?.username },
  });

  return (
    <div>
      {console.log({ referralTreeData })}
      <div className="text-white">
        <HeroTemp needNav={true}>
          <MainBannerTitle
            title="Referral Tree Of Next Trade"
            subRoute="Referral Tree"
          />
        </HeroTemp>
      </div>

      <div className="mt-10">
        <div className="mt-10 mb-10 overflow-y-scroll h-screen max-w-[90vw] w-full overflow-x-scroll scrollbar-none mx-auto">
          <div className="w-full bg-blue-light text-center py-2 border-t border-x border-gold-light_400 text-gold-light_400 font-semibold">
            Level 1
          </div>
          <table className="bg-gray-100 text-gray-900 w-full">
            <thead className="bg-gray-100 text-gray-900 sticky top-0 left-0 w-full">
              <tr className="text-sm text-white">
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Referral Code
                </th>
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Username
                </th>
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Email
                </th>
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Employee Level
                </th>

                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Active?
                </th>

                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Paid?
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {referralTreeData?.length ? (
                referralTreeData.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white shadow-sm border-b border-blue-dark"
                  >
                    <td className="p-3 border border-gray-300 text-center ">
                      291605
                    </td>
                    <td className="p-3 border border-gray-300 text-blue-500 text-center underline">
                      {user?.username}
                    </td>
                    <td className="p-3 border border-gray-300 text-center ">
                      benjamin.ava427@yahoo.com
                    </td>
                    <td className="p-3 border border-gray-300 text-center ">
                      {user?.employeeLevel}
                    </td>

                    <td className="p-3 border border-gray-300 text-center">
                      {user?.isActive ? (
                        <FaSquareCheck
                          size={20}
                          className="text-green-500 flex items-center justify-center w-full"
                        />
                      ) : (
                        <FaWindowClose
                          size={18}
                          className="text-red-500 flex items-center justify-center w-full"
                        />
                      )}
                    </td>

                    <td className="p-3 border border-gray-300 text-center ">
                      {user?.isPaid ? (
                        <FaSquareCheck
                          size={20}
                          className="text-green-500 flex items-center justify-center w-full"
                        />
                      ) : (
                        <FaWindowClose
                          size={18}
                          className="text-red-500 flex items-center justify-center w-full"
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : isLoading === true ? (
                <tr className="text-center">
                  <td
                    colSpan={6}
                    className="pt-10 border border-gray-300 pb-10 "
                  >
                    <div className="flex items-center justify-center w-full gap-3">
                      <span className="text-blue-light text-lg">
                        Fetching data ...{" "}
                      </span>
                      <CustomBeatLoader />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr className="text-center">
                  <td
                    colSpan={6}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span>No Record Found!</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralTree;
