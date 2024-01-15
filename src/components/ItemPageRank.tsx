import React, { useState } from "react";
import FilledStarSvg from "./icons/FilledStarSvg";

const ItemPageRank = ({
  selectedStar,
  setSelectedStar,
}: {
  selectedStar: number | null;
  setSelectedStar: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleMouseEnter = (idx: number) => {
    setHoveredStar(idx);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const handleClick = (idx: number) => {
    setSelectedStar(idx);
  };

  const isStarHighlighted = (idx: number): boolean => {
    return (
      (hoveredStar !== null && idx <= hoveredStar) ||
      (selectedStar !== null && idx <= selectedStar)
    );
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(idx)}
        >
          <FilledStarSvg
            className={`cursor-pointer transition-all ${
              isStarHighlighted(idx) ? "fill-yellow-400" : "fill-gray-400"
            }`}
          />
          <input
            type="radio"
            name="rank"
            value={idx + 1}
            checked={selectedStar === idx}
            onChange={() => setSelectedStar(idx)}
            className="hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default ItemPageRank;
