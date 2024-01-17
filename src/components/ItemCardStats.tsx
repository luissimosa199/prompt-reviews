import React from "react";
import StarRank from "./StarsRank";
import { getPromptStats } from "@/utils/getPromptStats";

const ItemCardStats = async ({ _id }: { _id: string }) => {
  const { success, rank, votes } = await getPromptStats(_id);

  return (
    <div className="flex mb-2 gap-1 justify-center">
      {success ? (
        votes ? (
          <>
            <StarRank rank={rank} />
            <span className="text-xs">{votes}</span>
          </>
        ) : (
          <p>Sin opiniones</p>
        )
      ) : (
        <p>Error</p>
      )}
    </div>
  );
};

export default ItemCardStats;
