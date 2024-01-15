import React, { FunctionComponent } from "react";
import Image from "next/image";

interface DoctorPageHeaderProps {
  image: string;
  name: string;
  type: string;
}

const DoctorPageHeader: FunctionComponent<DoctorPageHeaderProps> = ({
  name,
  type,
  image,
}) => {
  return (
    <div className="pb-2 md:p-4 flex flex-col items-end bg-white md:flex-row">
      <div className="relative mx-auto md:mx-0 w-full md:w-auto">
        <div className="w-full md:w-96 h-[400px] md:h-96 bg-gray-300 mb-2 overflow-hidden z-0 relative">
          {image ? (
            <Image
              src={image}
              alt="profile picture"
              className="object-cover object-center "
              fill
            />
          ) : (
            <div className="object-cover object-center bg-blue-300 w-full h-full"></div>
          )}
        </div>
        <div
          className={`absolute top-0 w-full h-full bg-gradient-to-t from-black via-transparent z-10`}
        ></div>

        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="text-5xl font-semibold text-white mb-2">{name}</h1>
          {type && (
            <ul className="flex gap-2 text-sm justify-start md:w-fit">
              <li className=" px-2 py-1 font-semibold bg-blue-200 rounded-md uppercase">
                {type}
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="mx-auto md:ml-12"></div>
    </div>
  );
};

export default DoctorPageHeader;
