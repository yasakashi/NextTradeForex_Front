import MainBannerTitle from "../../common/MainBannerTitle";
import HeroTemp from "../../components/HeroTemp";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";

const ReferralTree = () => {
  const isLoading = false;

  const referralTreeData = [1, 2];

  return (
    <div>
      <div className="text-white">
        <HeroTemp needNav={true}>
          <MainBannerTitle
            title="Referral Tree Of Next Trade"
            subRoute="Referral Tree"
          />
        </HeroTemp>
      </div>

      <div className="mt-10">
        <div className="mt-10 mb-10 overflow-y-scroll max-h-[40vh] max-w-[90vw] w-full overflow-x-scroll scrollbar-none mx-auto">
          <div className="w-full bg-blue-light text-center py-2 border-t border-x border-gold-light_400 text-gold-light_400 font-semibold">Level 1</div>
          <table className="bg-gray-100 text-gray-900 w-full">
            <thead className="bg-gray-100 text-gray-900">
              <tr className="text-sm text-white">
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Referral Code
                </th>
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Name
                </th>
                <th className="p-3 bg-blue-light border border-gold-light_400">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {referralTreeData?.length ? (
                referralTreeData.map((user, index) => (
                  <tr key={index} className="bg-white shadow-sm">
                    <td className="p-3 border border-gray-300 text-center ">
                      291605
                    </td>
                    <td className="p-3 border border-gray-300 text-blue-500 text-center underline">
                      eliteblinders
                    </td>
                    <td className="p-3 border border-gray-300 text-center ">
                      benjamin.ava427@yahoo.com
                    </td>
                  </tr>
                ))
              ) : isLoading === true ? (
                <tr className="text-center">
                  <td
                    colSpan={11}
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
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span>No Request Has been Found!</span>
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
