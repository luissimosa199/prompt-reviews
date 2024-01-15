import React from "react";
import StarOfLifeSvg from "./icons/StarOfLifeSvg";
import HorizontalTagSvg from "./icons/HorizontalTagSvg";
import StarRank from "./StarsRank";
import MedalSvg from "./icons/MedalSvg";
import CommentDotsSvg from "./icons/CommentDotsSvg";

const ItemPageInfoBody = ({
  name,
  tags,
  showData,
  handleShowVisibility,
  prompt,
  rank,
}: {
  name: string;
  tags: string[];
  prompt: string;
  showData: boolean;
  handleShowVisibility: () => void;
  rank: number;
}) => {
  return (
    <div>
      <div className="flex gap-2 mb-2 text-lg font-semibold">
        <StarOfLifeSvg />
        {name ? (
          <p>{name}</p>
        ) : (
          <span className="text-sm text-gray-500 italic">Nombre</span>
        )}
      </div>
      <div className="flex gap-2 mb-2">
        <HorizontalTagSvg />
        {tags ? (
          <p className="uppercase">
            {tags.map((tag, index) =>
              index !== tags.length - 1 ? `${tag}, ` : tag
            )}
          </p>
        ) : (
          <span className="text-sm text-gray-500 italic">Categorías</span>
        )}
      </div>
      <div className="flex gap-2 mb-2 text-lg font-semibold">
        <MedalSvg />
        {rank ? (
          <StarRank rank={rank} />
        ) : (
          <span className="text-sm text-gray-500 italic">Rank</span>
        )}
      </div>
      <div className="flex gap-2 mb-2">
        <CommentDotsSvg />
        {showData ? (
          prompt ? (
            <p id="prompt">{prompt}</p>
          ) : (
            <span className="text-sm text-gray-500 italic">Link?</span>
          )
        ) : (
          <button
            className="text-blue-500 font-semibold"
            onClick={handleShowVisibility}
          >
            Ver Prompt
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemPageInfoBody;
