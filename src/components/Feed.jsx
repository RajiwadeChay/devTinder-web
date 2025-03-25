import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      if (res?.data?.data?.length > 0) {
        dispatch(addFeed(res?.data?.data));
      } else {
        dispatch(addFeed([]));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return;

  if (feed?.length === 0) {
    return (
      <h2 className="text-3xl font-bold text-center my-8">
        No New Users Found!
      </h2>
    );
  }

  return (
    feed?.length > 0 && (
      <div>
        <UserCard user={feed?.[0]} />
      </div>
    )
  );
};

export default Feed;
