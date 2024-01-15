import React from "react";
import ThumbsDownSvg from "./icons/ThumbsDownSvg";
import ThumbsUpSvg from "./icons/ThumbsUpSvg";
import OpinionCardRank from "./OpinionCardRank";
import { formatOpinionDate } from "@/utils/formatOpinionDate";
import Image from "next/image";

const ItemPageOpinionCard = ({
  name,
  createdAt,
  rank,
  comment,
  files,
  _id,
  audio,
}: {
  name: string;
  createdAt: string;
  rank: number;
  comment: string;
  files: string[];
  _id: string;
  audio?: string;
}) => {
  return (
    <div className="shadow-md w-full flex gap-2 p-4 mb-8 max-w-3xl mx-auto">
      <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0"></div>
      <div className="w-full">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">{name || "Anónimo"}</p>
            <p className="text-sm">{formatOpinionDate(createdAt)}</p>
          </div>
          <OpinionCardRank rank={rank} />
        </div>
        <div className="my-2">
          <p className="mb-2">{comment}</p>
          {audio && (
            <div>
              <audio
                src={audio}
                controls
                className="w-full"
              />
            </div>
          )}
          <div>
            {files &&
              files.map((file, idx) => {
                const isVideo = file.includes("video");
                const isImage = file.includes("image");

                if (isVideo) {
                  return (
                    <video
                      key={`video_${_id}_${idx}`}
                      src={file}
                      controls
                      className="w-full"
                    />
                  );
                }

                if (isImage) {
                  return (
                    <Image
                      width={500}
                      height={500}
                      alt="Opinion image"
                      key={`image_${_id}_${idx}`}
                      src={file}
                      className="w-full"
                    />
                  );
                }

                return (
                  <div key={file}>
                    <a
                      className="text-blue-400 hover:text-blue-600"
                      href={file}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir archivo
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex gap-1 justify-end items-center">
          <span className="font-semibold">¿Te resultó útil?</span>
          <button className="border rounded-md px-2 py-1 flex gap-1 items-center">
            <ThumbsUpSvg />
            <span>Si</span>
          </button>
          <button className="border rounded-md px-2 py-1 flex gap-1 items-center">
            <ThumbsDownSvg />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPageOpinionCard;
