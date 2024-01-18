import React from "react";
import StarRank from "./StarsRank";

const ItemCardStats = async ({
  rank,
  votes,
}: {
  rank: number;
  votes: number;
}) => {
  return (
    <div className="flex mb-2 gap-1 justify-center">
      {votes ? (
        <>
          <StarRank rank={rank} />
          <span className="text-xs">{votes}</span>
        </>
      ) : (
        <p>Sin opiniones</p>
      )}
    </div>
  );
};

export default ItemCardStats;
