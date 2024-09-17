import MainBannerTitle from "../../../common/MainBannerTitle";
import HeroTemp from "../../../components/HeroTemp";

const PartnershipProfileView = () => {
  return (
    <div>
      <div className="text-white">
        <HeroTemp needNav={true}>
          <MainBannerTitle title="Partnership" subRoute="Partnersip" />
        </HeroTemp>
      </div>

      <div className="w-full py-20 text-center text-white text-2xl">
        Profile View
      </div>
    </div>
  );
};

export default PartnershipProfileView;
