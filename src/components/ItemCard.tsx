import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemCardStats from "./ItemCardStats";

const ItemCard = ({
  _id,
  slug,
  name,
  tags,
  image,
}: {
  _id: string;
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
          {image ? (
            <Image
              src={image}
              width={128}
              height={128}
              alt={`image`}
              className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 mx-auto"
            />
          ) : (
            <div className="w-full h-32 bg-gray-300"></div>
          )}
        </Link>
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <p className="font-bold">{name}</p>
          <p className="italic text-sm">
            {tags.map((e, idx) => {
              return `${e}${idx === tags.length - 1 ? "" : ", "}`;
            })}
          </p>
          <ItemCardStats _id={_id} />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
