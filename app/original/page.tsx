import Image from "next/image";

import getOriginalSongs from "@/actions/getOriginalSongs";
import Header from "@/components/Header";

import OriginalContent from "./components/OriginalContent";

export const revalidate = 0;

const Original = async () => {
  const songs = await getOriginalSongs();

  return (
    <div 
      className="
        bg-[#ededed] 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header>
        <div className="mt-20">
          <div 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                className="object-cover"
                fill
                src="/images/Original Music.png"
                alt="Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">
                Playlist
              </p>
              <h1 
                className="
                  text-black 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
              >
                Original Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <OriginalContent songs={songs} />
    </div>
  );
}

export default Original;
