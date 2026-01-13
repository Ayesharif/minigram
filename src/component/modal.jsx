import {
  Camera,
  Globe,
  Mail,
  MapPin,
  NotebookPen,
  User,
  X
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { getAvatar } from "../../utils/getAvater";
import { updateProfile } from "../features/actions/userAction";
import { checkUser } from "../features/actions/authAction";

export default function EditProfileModal({ show, setShow }) {
const dispatch=useDispatch();
const{currentUser}=useSelector((store)=>store.auth)
const avatar = getAvatar(currentUser?.username);
const [Image, setImage] = useState({ coverimage: null, profileimage: null });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    city: "",
    bio: "",
    country: "",
    coverimage: null,
    profileimage: null,
  });

  const [preview, setPreview] = useState({
    coverimage: null,
    profileimage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // -------------------------
  // HANDLE INPUT
  // -------------------------
useEffect(() => {
  if (currentUser) {
    setFormData({
      username:currentUser.username || "",
      bio:currentUser.bio || "",
      email:currentUser.email,
      city:currentUser.city || "",
      country:currentUser.country || "",
      coverimage:currentUser.coverImage || null,
      profileimage:currentUser.profileImage || null,
    });
  }
}, [currentUser]);

  // ------------------------------------
  // SUBMIT FORM
  // ------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      coverimage: formData.coverimage,
      profileimage: formData.profileimage
    };
    console.log(payload);
    
const data = new FormData();
data.append('username', formData?.username||"")

data.append('city', formData?.city||"")
data.append('country', formData?.country||"")
data.append('bio', formData?.bio||"")

if(Image.coverimage !== null){
 data.append('coverimage', Image?.coverimage||"")
 data.append('coverPublicId',currentUser?.coverimage?.publicId||"" )
  
}
if(Image.profileimage !== null){
console.log("done");

 data.append('profileimage', Image?.profileimage||"")
 data.append('profilePublicId',currentUser?.profileimage?.publicId ||"")
}
    console.log("Form submitted:",data);
    dispatch(updateProfile(data))
    // setTimeout(()=>{
    //   dispatch(checkUser())
    // }, 1500)
    setShow(false)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (!file) return;

    setImage((prev) => ({ ...prev, [name]: file }));
    setPreview((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  };

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] md:w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <X
            onClick={() => setShow(false)}
            className="cursor-pointer"
          />
        </div>

        {/* COVER IMAGE */}
        <div
          className="h-48 bg-linear-to-r from-purple-600 to-pink-700 relative"
          style={
            preview.coverimage
              ? { backgroundImage: `url(${preview.coverimage})`, backgroundSize: "cover" }
              : formData?.coverimage?.image? { backgroundImage: `url(${formData?.coverimage?.image})`, backgroundSize: "cover" }
              :{}
              
          }
        >
          <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              hidden
              name="coverimage"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
              <Camera size={18} />
              Change Cover
            </div>
          </label>
        </div>

        {/* PROFILE IMAGE */}
        <div className="relative -mt-14 flex justify-center">
          <div className="relative">
            { preview.profileimage ?
            (<img
              src={preview.profileimage}
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
              alt=""
            />): 
            formData.profileimage.image?
            (<img
              src={formData?.profileimage?.image}
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
              alt=""
            />) :(<>
           <div 
            className="w-28 h-28 flex items-center justify-center rounded-full border-4 border-white bg-linear-to-r from-purple-600 to-pink-700 relative"
           >{avatar}</div>
            </>)
          
          }
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
              <Camera className="text-white w-4 h-4" />
              <input
                type="file"
                hidden
                name="profileimage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="Muhammad Ayesh"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold">Bio</label>
            <div className="relative">
              <NotebookPen className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="Muhammad Ayesh"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="xyz@email.com"
              />
            </div>
          </div>

          {/* CITY & COUNTRY */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="City"
              />
            </div>

            <div className="relative">
              <Globe className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="Country"
              />
            </div>
          </div>

          {/* BUTTON */}
          <Button
            text="Save Changes"
            Action={handleSubmit}
padding={"py-1"}
width={"w-full"}
          />
        </div>
      </div>
    </div>
  );
}
