"use client";

import { useEffect, useState } from "react";
import { AiOutlineBlock } from "react-icons/ai";
import { CgPathDivide } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface DerivativeButtonProps {
  songId: string;
};

const DerivativeButton: React.FC<DerivativeButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isDerivative, setIsDerivative] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
  
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('derivative_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsDerivative(true);
      }
    }

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isDerivative ? CgPathDivide : AiOutlineBlock;

  const handleDerivative = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isDerivative) {
      const { error } = await supabaseClient
        .from('derivative_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message);
      } else {
        setIsDerivative(false);
      }
    } else {
      const { error } = await supabaseClient
        .from('derivative_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsDerivative(true);
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
      onClick={handleDerivative}
    >
      <Icon color={isDerivative ? 'black' : '#ededed'} size={25} />
    </button>
  );
}

export default DerivativeButton;
