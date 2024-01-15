import React from "react";
import FilledStarSvg from "./icons/FilledStarSvg";
import StarSvg from "./icons/StarSvg";

const OpinionCardRank = ({ rank }: { rank: number }) => {
  return (
    <div className="flex mb-2 gap-1 justify-center">
      {[...Array(5)].map((_, idx) => {
        return idx < rank ? (
          <FilledStarSvg key={`star_${idx}`} />
        ) : (
          <StarSvg key={`star_${idx}`} />
        );
      })}
    </div>
  );
};

export default OpinionCardRank;
