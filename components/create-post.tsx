import { Avatar } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import Link from "next/link";

function CreatePostHome() {
  return (
    <Link href="/create/post/new">
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-2xl bg-white rounded-lg cursor-pointer">
          <div className="flex items-center justify-between h-16">
            <div className="ml-5">
              <Avatar
                src="https://www.w3schools.com/howto/img_avatar.png"
              />
            </div>

            <button className="bg-gray-200 rounded-md px-10 font-normal">
              Por que no posteas algo?
            </button>

            <CameraIcon className="h-6 w-6 text-blue-500 mr-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CreatePostHome;
