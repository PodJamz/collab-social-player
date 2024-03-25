"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import useUploadModal from "@/hooks/useUploadModal";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setCurrentUserId(user.id);
    } else {
      setCurrentUserId(null);
    }
  }, [user]);

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

  //  if (!subscription) {
  //    return subscribeModal.onOpen();
  //  }

    return uploadModal.onOpen();
  }

  return ( 
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">
            Library
          </p>
        </div>
  {currentUserId === "958defc2-3b76-424a-8cdf-7857e3ad987e" && (
    <AiOutlinePlus onClick={onClick} size={20} className="text-neutral-400 cursor-pointer hover:text-black transition" />
  )}
</div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem 
            onClick={(id: string) => onPlay(id)} 
            key={item.id} 
            data={item}
          />
        ))}
      </div>
    </div>
   );
}
 
export default Library;