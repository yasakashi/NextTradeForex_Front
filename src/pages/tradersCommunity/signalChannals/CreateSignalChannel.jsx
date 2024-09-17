import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import CummunityNavbar from "../../../components/tradersCommunity/Navbar";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { createSignalChannleAction, getSignalChannel, updateSignalChannel } from "../../../redux/features/signals/signalChannelsSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CustomCircleLoader from "../../../utils/loaders/CustomCircleLoader";

const CreateSignalChannel = ({ pageType }) => {
  const navigate = useNavigate();
  const groupId = localStorage.getItem("groupId");
  const { id } = useParams();


  const [title, setTitle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelType, setChannelType] = useState(false);
  const [groupType, setGroupType] = useState("1");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, signalChannel } = useSelector(
    (state) => state.signalChannel
  );

  const [titleErr, setTitleErr] = useState("");

  const handleChannelType = (e) => {

    const value = e.target.value === "paid";
    setChannelType(value);
  };

  const handleGroupTypeChange = (e) => {
    setGroupType(e.target.value);
  };

  useEffect(() => {
    if (pageType === "update") {
      dispatch(
        getSignalChannel({
          axiosPrivate,
          data: {
            communitygroupId: groupId,
            Id: id,
            sortitem: [{ fieldname: "createdatetime", ascending: true }],
          },
        })
      );
    }
  }, [pageType, groupId, id]);
  
    useEffect(() => {
      if (pageType === "update" && signalChannel) {
        setTitle(signalChannel.title);
        // setChannelDescription(signalChannel.channelDescription || "");
        setChannelType(signalChannel.isneedpaid);
        setGroupType(String(signalChannel.grouptypeId));
      }
    }, [pageType, signalChannel]);

  // -------------------------
  const createSignalChannleHandler = (e) => {
    e.preventDefault();
    if (!id) {
      
      if (title !== "") {
        dispatch(
          createSignalChannleAction({
            axiosPrivate,
            data: {
              title,
              communitygroupid: groupId,
              isneedpaid: channelType,
              grouptypeId: JSON.parse(groupType),
            },
            navigate,
            toast,
            id : groupId,
          })
        );
      } else {
        setTitleErr("Plese enter the channel name.");
      }
    } else if (id) {
      dispatch(
        updateSignalChannel({
          axiosPrivate,
          data: {
            title,
            id: id,
            isneedpaid: channelType,
            grouptypeId: JSON.parse(groupType),
          },
          navigate,
          toast,
          id: groupId,
        })
      );
    }
  };

// updateSignalChannel;
  return (
    <>
      {console.log({ signalChannel })}
      {isLoading && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )}
      <div>
        <CummunityNavbar />

        <section className="relative w-full h-[40vh]">
          <img
            className="w-full h-full absolute inset-0 -z-10"
            src="/assets/slider-bg.png"
            alt=""
          />

          <div className="z-50 flex justify-between items-center p-2 h-full">
            <div className="flex justify-center w-full">
              {pageType === "update" ? (
                <h4 className="text-4xl text-white">Update Signal Channel</h4>
              ) : pageType === "create" ? (
                <h4 className="text-4xl text-white">Create Signal Channel</h4>
              ) : null}
            </div>

            <div className="h-full w-full">
              <img
                className="size-full object-cover"
                src="/assets/breadcrumb_img.png"
                alt="breadcrumb"
              />
            </div>
          </div>
        </section>
        <div className="bg-blue-light py-10 w-full">
          <div className="bg-blue-dark w-1/2 mx-auto p-4 rounded-lg">
            <form onSubmit={createSignalChannleHandler}>
              <label className="flex flex-col justify-start w-full">
                <span className="text-gray-300 text-base mb-2 ">
                  Channel Name:
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="px-4 py-3 rounded-lg border w-full outline-blue-light"
                  type="text"
                  placeholder="Channel name"
                />
                <span className="text-red-600 text-sm py-1">{titleErr}</span>
              </label>

              <label className="flex flex-col justify-start w-full mt-3">
                <span className="text-gray-300 text-base mb-2 ">
                  Description:
                </span>
                <textarea
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  rows={3}
                  placeholder="Channel Description"
                  className="w-full mt-1 rounded-lg border p-2 outline-blue-light"
                />
              </label>

              <div className="flex flex-col gap-3 my-3 text-gray-300">
                <h4 className="text-gray-300">Channel Type: </h4>
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="free"
                    className="flex items-center cursor-pointer space-x-3 "
                  >
                    <input
                      value="free"
                      checked={channelType === false}
                      onChange={handleChannelType}
                      name="channelType"
                      id="free"
                      type="radio"
                      className="accent-gold-light_300"
                    />
                    <span>Free</span>
                  </label>

                  <label
                    htmlFor="paid"
                    className="flex items-center cursor-pointer space-x-3 "
                  >
                    <input
                      value="paid"
                      checked={channelType === true}
                      onChange={handleChannelType}
                      name="channelType"
                      id="paid"
                      type="radio"
                      className="accent-gold-light_400"
                    />
                    <span>Paid</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-start items-center gap-4 w-full my-3">
                <label
                  htmlFor="public"
                  className="flex items-start transition-all rounded-lg cursor-pointer"
                >
                  <div className="text-white flex items-center text-sm gap-3">
                    <input
                      value="1"
                      checked={groupType === "1"}
                      onChange={handleGroupTypeChange}
                      name="groupType"
                      id="public"
                      type="radio"
                      className="accent-gold-light_300"
                    />
                    <span className="text-sm">public </span>
                  </div>
                </label>

                <label
                  htmlFor="privet"
                  className="flex flex-col gap-4 items-start transition-all rounded-lg cursor-pointer"
                >
                  <div className="text-white flex items-center text-sm gap-3">
                    <input
                      value="2"
                      checked={groupType === "2"}
                      onChange={handleGroupTypeChange}
                      name="groupType"
                      id="privet"
                      type="radio"
                      className="accent-gold-light_300"
                    />
                    <span className="">Private </span>
                  </div>
                </label>
              </div>

              <div>
                <button className="text-blue-light px-6 py-3 rounded-lg bg-gold-light_300 hover:bg-gold-light_400 transition-all font-semibold shadow-lg">
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CreateSignalChannel;
