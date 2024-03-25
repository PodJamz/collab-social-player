import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  console.log("song:", song); // Log the song object to the console

  if (!song) {
    console.log("Invalid song object");
    return '';
  }

  const { data: songData } = supabaseClient
  .storage
  .from('songs')
  .getPublicUrl(song.song_path);

  console.log("songData:", songData); // Log the songData object to the console

  if (!songData || !songData.publicUrl) {
    console.log("Unable to retrieve song URL");
    return '';
  }

  console.log("songUrl:", songData.publicUrl); // Log the songUrl to the console

  return songData.publicUrl;
};

export default useLoadSongUrl;
