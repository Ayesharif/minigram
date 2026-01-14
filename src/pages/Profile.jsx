import { EditIcon, Globe, MapPin } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Post from "../component/Post";
import EditProfileModal from "../component/modal";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar } from "../../utils/getAvater";
import CreatPost from "../component/CreatPost";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../component/Button";

import { GetFriendPost, GetMyPost } from "../features/actions/postAction";
import { getFriendsProfile, getProfile, toggleFollower } from "../features/actions/userAction";
import FriendsList from "../component/FriendsList";

export default function Profile() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
      const [showFriends, setShowFriends] = useState(false);

  const { currentUser } = useSelector((store) => store.auth);
  const { profile, myProfile, friends } = useSelector((store) => store.user);
  const { profilePosts, myposts } = useSelector((store) => store.post);

  // 🔹 Decide which profile & posts to show
  const userProfile = id ? profile : myProfile;
  const posts = id ? profilePosts : myposts;
    const viewFriends=friends.slice(0,3);
  // 🔹 Load profile & posts
  useEffect(() => {
    if (id) {
      dispatch(getFriendsProfile(id));
      dispatch(GetFriendPost(id));
    } else {
      dispatch(getProfile());
      dispatch(GetMyPost());
    }
  }, [id, dispatch]);

  // 🔹 Avatar & Images
  const avatar = getAvatar(userProfile?.username);
  const profileImage = userProfile?.profileImage?.image;
  const coverImage = userProfile?.coverImage?.image;


  // 🔹 Follow / Unfollow
  const handleFollow = (id) => {
    dispatch(toggleFollower(id)).then(() => {
      dispatch(getProfile()); // refresh my profile
      navigate("/profile");
    });
  };

  if (!userProfile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl text-black">
        <div className="w-full flex flex-col items-center">

          <div className="sm:w-[80%] flex flex-col gap-5 relative p-2">

            {/* Cover */}
            <div className="h-50 w-full bg-linear-to-r from-purple-600 to-pink-700 rounded-t-xl">
              {coverImage && (
                <img
                  src={coverImage}
                  className="rounded-t-xl h-full w-full object-cover"
                  alt=""
                />
              )}
            </div>

            {/* Profile Image */}
            <div className="w-40 h-40 rounded-full absolute top-30 left-20">
              {profileImage ? (
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={profileImage}
                  alt=""
                />
              ) : (
                <div className="w-full h-full rounded-full flex justify-center items-center text-white bg-linear-to-r from-purple-600 to-pink-700 text-2xl poppins-bold">
                  {avatar}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col mt-30 gap-3 relative">
              <p className="poppins-bold text-2xl">{userProfile?.username}</p>
              <p className="text-lg italic">{userProfile?.bio}</p>

              <div className="flex items-center gap-2">
                <MapPin className="w-5" />
                <p>{userProfile?.city}</p>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-5" />
                <p>{userProfile?.country}</p>
              </div>

              {/* Buttons */}
              <div className="w-full sm:absolute right-5 bottom-0 flex gap-5 justify-end">

                {currentUser?._id !== userProfile?._id && (
                  <Button
                    text="Unfollow"
                    Action={() => handleFollow(userProfile?._id)}
                    width="sm:w-30 w-full"
                  />
                )}

                {currentUser?._id === userProfile?._id && (
                  <EditIcon onClick={() => setShow(true)} />
                )}
              </div>
            </div>

            <hr />

            {/* Friends & Posts */}
            <div className="grid md:grid-cols-[300px_1fr] md:gap-4 gap-10 px-5 py-10">

              {/* Friends */}
              <div className="flex flex-col gap-5 mt-5 bg-gray-100 shadow-md h-max p-2 rounded-lg relative">
                <p className="font-semibold text-xl">Friends</p>
                            <Button Action={()=>setShowFriends(true)} width={"w-fit absolute  right-2"} type={"button"} padding={"px-2"} className='absolute right-0 ' text={"See All"}/>
                <div className="grid grid-cols-3 gap-3">
                  {viewFriends?.length > 0 ? (
                    viewFriends.map((friend) => (
                      <div key={friend?._id}
                                                      onClick={()=> navigate(`/profile/${friend?._id}`)} 
                      className="flex flex-col cursor-pointer items-center bg-white p-2 text-center rounded-lg shadow">
                        {friend?.profileImage?.image ? (
                          <img
                            src={friend?.profileImage?.image}
                            className="w-15 h-15 object-cover rounded-full"
                            alt=""
                          />
                        ) : (
                          <div className="w-15 h-15 flex justify-center items-center rounded-full bg-linear-to-r from-purple-600 to-pink-700 text-white">
                            {getAvatar(friend?.username)}
                          </div>
                        )}
                        <p>{friend?.username}</p>
                      </div>
                    ))
                  ) : (
                    <p>No friends found</p>
                  )}
                </div>
              </div>

              {/* Posts */}
              <div className="w-full flex flex-col gap-5">

                {currentUser?._id === userProfile?._id && <CreatPost width="w-full" />}

                {posts?.length > 0 ? (
                  posts.map((post) => (
                    <Post key={post?._id} width="w-full" post={post} />
                  ))
                ) : (
                  <p className="text-center mt-20">No posts available</p>
                )}
              </div>
            </div>

            <EditProfileModal setShow={setShow} show={show} />
                                        <FriendsList  setShow={setShowFriends} show={showFriends} />
          </div>
        </div>
      </div>
    </div>
  );
}
