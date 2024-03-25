import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

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
        <div className="mb-2">
          <h1 
            className="
            text-black 
              text-3xl 
              font-semibold
            ">
              Welcome to Collaboration Social
          </h1>
          <div 
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
          >

            
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-semibold">
            Recent Uploads
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
