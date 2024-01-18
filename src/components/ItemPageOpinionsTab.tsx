import React from "react";
import ItemPageOpinionCard from "./ItemPageOpinionCard";
// import Ad from "./Ad";
import { useQuery } from "@tanstack/react-query";
import { Opinion } from "@/types";

const ItemPageOpinionsTab = ({ itemId }: { itemId: string }) => {
  const fetchOpinions = async () => {
    const response = await fetch(`/api/opinions?promptId=${itemId}`);
    return response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["opinions", itemId],
    queryFn: fetchOpinions,
  });

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-4">
      {/* <div className="w-full mt-4 overflow-hidden">
        <Ad />
      </div> */}
      {data.opinions.length > 0 ? (
        data.opinions.map((e: Opinion) => {
          return (
            <ItemPageOpinionCard
              key={`comment_${e._id}`}
              _id={e._id}
              name={e.name}
              createdAt={e.createdAt}
              rank={e.rank}
              comment={e.comment}
              files={e.files}
              audio={e.audio}
            />
          );
        })
      ) : (
        <div className="shadow-md w-full flex gap-2 p-4 mb-8 max-w-3xl mx-auto ">
          <p className="text-center w-full">
            Este prompt aún no tiene comentarios
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemPageOpinionsTab;
