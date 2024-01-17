import React from "react";

const InputListItem = ({
  tag,
  setInputList,
}: {
  tag: string;
  setInputList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-sans">
      <span>{tag}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          setInputList((prev) => prev.filter((e) => e !== tag));
        }}
        className="ml-2 focus:outline-none"
      >
        <span className="sr-only">Remove tag</span>
        <div className="bg-white rounded-full p-0.5">
          <svg
            className="h-3 w-3 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default InputListItem;
