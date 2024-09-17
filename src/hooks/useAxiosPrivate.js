import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../utils/cookie";
import { axiosPrivate } from "../axios/axiosInstance";

const useAxiosPrivate = () => {
  let token = localStorage.getItem("loginToken");

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjEiLCJqdGkiOiI4NjFhNjBhMC1hZTM0LTQyMGItYTNhYS0wMWQ4MmIwMzE3ZDQiLCJ1aWQiOiI1Yzc5ZDAwZC05MGZhLTQ3MGYtZDc2Mi0wOGRjN2NiNzZiNjciLCJleHAiOjE3MzIxOTI2NDAsImlzcyI6Ik1pdHJhIiwiYXVkIjoiTmV4dFRyYWRlQVBJcyJ9.QOzJJZsWOwMnrhgmmjOMU0ZkdN0JC3HHyUcUea5s5sM";

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5YXNhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjEiLCJqdGkiOiI4NjFhNjBhMC1hZTM0LTQyMGItYTNhYS0wMWQ4MmIwMzE3ZDQiLCJ1aWQiOiI1Yzc5ZDAwZC05MGZhLTQ3MGYtZDc2Mi0wOGRjN2NiNzZiNjciLCJleHAiOjE3MzIxOTI2NDAsImlzcyI6Ik1pdHJhIiwiYXVkIjoiTmV4dFRyYWRlQVBJcyJ9.QOzJJZsWOwMnrhgmmjOMU0ZkdN0JC3HHyUcUea5s5sM";
  // userData &&
  // JSON.parse(userData).messageData &&
  // JSON.parse(userData).messageData;

  // if (!token) console.log("error");

  const dispatch = useDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        config.withCredentials = true;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token, dispatch]);
  return axiosPrivate;
};

export default useAxiosPrivate;
