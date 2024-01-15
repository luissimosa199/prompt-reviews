import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRank from "./StarsRank";

const ItemCard = ({
  slug,
  name,
  tags,
  image,
  rank,
  votes,
}: {
  slug: string;
  name: string;
  tags: string[];
  image: string;
  rank: number;
  votes: number;
}) => {
  return (
    <div className="w-64 mb-8">
      <div className="bg-white shadow-md rounded p-4 flex flex-col items-center mb-4 w-full">
        <Link
          href={`/prompt/${slug}`}
          className="w-full h-full"
        >
          {/* <Image
            src={""}
            width={128}
            height={128}
            alt={`image`}
            className="w-16 h-16 object-cover rounded-full mb-4 md:mb-0"
          /> */}
          <div className="w-full h-32 bg-gray-300"></div>
        </Link>
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <p className="font-bold">{name}</p>
          <p className="italic text-sm">
            {tags.map((e, idx) => {
              return `${e}${idx === tags.length - 1 ? "" : ", "}`;
            })}
          </p>
          <div className="flex mb-2 gap-1 justify-center">
            <StarRank rank={rank} />
            <span className="text-xs">({votes})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
