"use client";
import { fetchCategories } from "@/utils/getCategories";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ChevronRightSvg from "./icons/ChevronRightSvg";

const tailwindNamedColors = [
  "black",
  "white",
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "warmGray",
  "trueGray",
  "gray",
  "coolGray",
  "blueGray",
] as const;

type TailwindColor = (typeof tailwindNamedColors)[number];

type PromptInputListProps = {
  placeholder?: string;
  primaryColor?: TailwindColor;
  inputList: string[];
  setInputList: Dispatch<SetStateAction<string[]>>;
};

const PromptInputList: FunctionComponent<PromptInputListProps> = ({
  inputList,
  setInputList,
  placeholder,
  primaryColor = "blue",
}) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetchCategories();
      setSuggestions(response);
    })();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    setHighlightedIndex(null);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const filteredSuggestions = suggestions.filter((e) =>
      e.startsWith(inputText)
    );

    if (event.key === "Enter") {
      event.preventDefault(); // Prevent any default form action
      if (
        highlightedIndex !== null &&
        highlightedIndex < filteredSuggestions.length
      ) {
        addInput(filteredSuggestions[highlightedIndex]);
      } else {
        addInput();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent default scroll behavior
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex >= filteredSuggestions.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex <= 0
          ? filteredSuggestions.length - 1
          : prevIndex - 1
      );
    }
  };

  const addInput = (valueToAdd?: string) => {
    const inputValue = (valueToAdd || inputText).trim().toLocaleLowerCase();

    if ((inputList as string[]).includes(inputValue)) {
      setInputText("");
      return;
    }
    if (inputValue !== "") {
      setInputList((prevInputs) => [...(prevInputs as string[]), inputValue]);
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="relative">
        <div className="relative z-10">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className="border rounded px-3 py-2 w-full mb-2"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              addInput();
              if (inputRef.current) inputRef.current.focus();
            }}
            className={`absolute flex justify-center items-center right-2 top-2 text-lg font-bold rounded-full shadow w-6 h-6 leading-4 text-${primaryColor}-500 border border-${primaryColor}-500 bg-white hover:bg-${primaryColor}-200 hover:text-${primaryColor}-700`}
          >
            <ChevronRightSvg />
          </button>
        </div>
        {suggestions.length > 0 && inputText.length > 0 && (
          <ul className="absolute bg-white border rounded-md w-full max-h-[200px] overflow-y-auto mt-2 z-50">
            {suggestions
              .filter((e) => e.startsWith(inputText))
              .map((suggestion, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer px-3 py-2 ${
                    highlightedIndex === idx ? "bg-gray-200" : ""
                  } hover:bg-gray-200`}
                  onClick={() => {
                    addInput(suggestion);
                  }}
                >
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PromptInputList;
