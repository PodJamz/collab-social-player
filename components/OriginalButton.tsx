"use client";

import { useEffect, useState } from "react";
import { AiOutlineTrademarkCircle, AiFillTrademarkCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface OriginalButtonProps {
  songId: string;
};

const OriginalButton: React.FC<OriginalButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isOriginal, setIsOriginal] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
  
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('original_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsOriginal(true);
      }
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isOriginal ? AiFillTrademarkCircle : AiOutlineTrademarkCircle;

  const handleOriginal = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isOriginal) {
      const { error } = await supabaseClient
        .from('original_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsOriginal(false);
      }
    } else {
      const { error } = await supabaseClient
        .from('original_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsOriginal(true);
        toast.success('Success');
      }
    }

    router.refresh();
  }

  return (
    <button 
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleOriginal}
    >
      <Icon color={isOriginal ? 'black' : '#ededed'} size={25} />
    </button>
  );
}

export default OriginalButton;
