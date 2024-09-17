import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getSignalChannel } from "../../../redux/features/signals/signalChannelsSlice";
import { useEffect } from "react";

const AdminSignalChannels = () => {

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => { 

    dispatch(getSignalChannel({axiosPrivate}))
  }, [])
  return (
    <div className="flex items-start justify-center">
      <div className="text-left w-full">
        <h4>Signal Channels</h4>
        
      </div>
    </div>
  );
};

export default AdminSignalChannels;
