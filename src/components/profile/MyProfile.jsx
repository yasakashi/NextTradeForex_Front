import { LiaTrophySolid } from "react-icons/lia";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <div>
      <div className="border max-w-[800px] items-start mx-auto mt-4 mb-14 border-gray-100 px-2 sm:px-20 md:px-6 flex flex-col md:flex-row md:center-start justify-between rounded-xl w-full sm:w-max md:w-auto ">
        <div className="flex w-full md:w-[60%] py-6 border-b md:border-b-0 md:border-r border-gray-300 h-full pr-3 items-center gap-x-8">
          <div>
            <h4 className="font-medium text-xl text-white">
              Complete Your Profile
            </h4>
            <div className="flex items-center gap-2 my-4">
              <span className="w-[70px] h-[6px] bg-gold-light_400 rounded-lg"></span>
              <span className="w-[70px] h-[6px] bg-white rounded-lg"></span>
              <span className="w-[70px] h-[6px] bg-white rounded-lg"></span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-white text-sm my-2">
                Please complete profile:{" "}
              </p>
              <span className="text-gray-700 font-medium">0/3</span>
            </div>
          </div>
          <div className="bg-blue-light rounded-full p-3 shadow-lg flex justify-center items-center">
            <LiaTrophySolid className="text-gold-light_400 " size={40} />
          </div>
        </div>

        <div className="py-6 w-full md:w-[40%] h-full pl-8">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <IoCloseOutline
                className="text-[#ED9700] border rounded-full border-[#ED9700] p-[1px]"
                size={14}
              />
              <Link
                className="text-[#757c8e] text-base underline hover:text-[#3e64de] transition-all"
                to="/user-profile/settings"
              >
                Set Your Profile Photo
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <IoCloseOutline
                className="text-[#ED9700] border rounded-full border-[#ED9700] p-[1px]"
                size={14}
              />
              <Link
                className="text-[#757c8e] text-base underline hover:text-[#3e64de] transition-all"
                to="/user-profile/settings"
              >
                Set Your Bio
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <IoCloseOutline
                className="text-[#ED9700] border rounded-full border-[#ED9700] p-[1px]"
                size={14}
              />
              <Link
                className="text-[#757c8e] text-base underline hover:text-[#3e64de] transition-all"
                to="/user-profile/settings/withdraw"
              >
                Set Withdraw Method
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-xl text-gray-100 mb-4">My Profile</h4>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">
              Registration Date :{" "}
            </span>
            <h5 className="text-gray-200 text-lg">{"-"}</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">First Name : </span>
            <h5 className="text-gray-200 text-lg">{user?.fname || "-"}</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Last Name : </span>
            <h5 className="text-gray-200 text-lg">{user?.lname || "-"}</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">User Name : </span>
            <h5 className="text-gray-200 text-lg">{user?.username || "-"}</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Email : </span>
            <h5 className="text-gray-200 text-lg">-</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Status : </span>
            <h5 className="text-gray-200 text-lg">
              {user?.isActive ? "Active" : "In Active"}
            </h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Phone Number : </span>
            <h5 className="text-gray-200 text-lg">{"-"}</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Skill/Occupation : </span>
            <h5 className="text-gray-200 text-lg">-</h5>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-base">Biography : </span>
            <h5 className="text-gray-200 text-lg">-</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
