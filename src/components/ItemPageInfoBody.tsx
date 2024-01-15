import React from "react";
import StarOfLifeSvg from "./icons/StarOfLifeSvg";
import HorizontalTagSvg from "./icons/HorizontalTagSvg";
import StarSvg from "./icons/StarSvg";

const ItemPageInfoBody = ({
  name,
  tags,
  showData,
  handleShowVisibility,
  phone,
}: {
  name: string;
  tags: string[];
  phone: string;
  showData: boolean;
  handleShowVisibility: () => void;
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
      <div className="flex gap-2 mb-2">
        <StarSvg />
        {showData ? (
          phone ? (
            <p>{phone}</p>
          ) : (
            <span className="text-sm text-gray-500 italic">Link?</span>
          )
        ) : (
          <button
            className="text-blue-500 font-semibold"
            onClick={handleShowVisibility}
          >
            Calificación
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemPageInfoBody;
