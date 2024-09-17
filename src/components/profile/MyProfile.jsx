import { getCookie } from "../../utils/cookie";

const MyProfile = () => {

 
  return (
    <div>
      <h4 className="text-xl text-gray-100 mb-4">My Profile</h4>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">Registration Date : </span>
          <h5 className="text-gray-200 text-lg">2023 , My 16</h5>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">First Name : </span>
          <h5 className="text-gray-200 text-lg">Amir</h5>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">Last Name : </span>
          <h5 className="text-gray-200 text-lg">Basiri</h5>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">User Name : </span>
          <h5 className="text-gray-200 text-lg">amirbasiri00</h5>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">Email : </span>
          <h5 className="text-gray-200 text-lg">-</h5>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-base">Phone Number : </span>
          <h5 className="text-gray-200 text-lg">98585225841</h5>
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
  );
};

export default MyProfile;
