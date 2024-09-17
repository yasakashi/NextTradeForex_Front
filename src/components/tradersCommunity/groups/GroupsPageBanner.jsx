import { BsMegaphone } from "react-icons/bs";
import { Link } from "react-router-dom";

const GroupsPageBanner = () => {
  return (
    <div className="mt-20 relative bg-blue-light min-h-[150px] box-border rounded-lg py-8 md:py-16 px-8 md:px-12 mb-8 z-10 ">
      <div className="text-center flex items-center">
        <div className="border-r-[3px] pr-8 border-white">
          <span className="text-white rotate-45">
            <BsMegaphone className="-rotate-[30deg]" size={40} />
          </span>
        </div>
        <div className="flex-1 text-left pl-6 z-30">
          <h3 className="text-2xl md:text-3xl font-bold text-white">Groups</h3>
          <div>
            <ul className="flex items-center gap-3 md:gap-2  text-white mt-2 flex-wrap">
              <li className="text-sm md:text-sm hover:text-gold-light_400 transition-colors font-semibold">
                <Link to="#">All Groups </Link>
                <span className="text-[10px] md:text-sm px-[2px]">11</span>
              </li>
              <li className="text-sm md:text-sm hover:text-gold-light_400 transition-colors font-semibold">
                <Link to="#">My Groups</Link>
                <span className="text-[10px] md:text-sm px-[2px]">5</span>
              </li>
              <li className="text-sm md:text-sm hover:text-gold-light_400 transition-colors font-semibold">
                <Link to="/traders-community/groups/create">
                  Create a Group
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden max-w-[50%] lg:block absolute right-6 z-20 bottom-0">
        <img src="/assets/community/people_2.png" alt="groups-background" />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 scale-150 sm:scale-125 lg:scale-100  right-32 z-10">
        <img
          className="bg-contain"
          src="/assets/community/shape_7-1.png"
          alt="groups-background"
        />
      </div>
    </div>
  );
};

export default GroupsPageBanner;
