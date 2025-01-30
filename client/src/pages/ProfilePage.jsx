import { User, Phone, Mail, Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function ProfilePage() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    }
  }
  return (
    <div className="bg-homepage-bg bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white/70 rounded-lg shadow-lg p-6">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold ">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-6"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-black">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-sm text-black flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.name}</p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-black flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
        </div>

        <div className="space-y-1.5">
          <div className="text-sm text-black flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone number
          </div>
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.phone}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage