"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import FormButton from "@/components/FormButton";
import { handleNewPrompt } from "@/utils/handleNewPrompt";
import PromptInputList from "@/components/PromptInputList";
import InputListItem from "@/components/InputListItem";
import { CldImage } from "next-cloudinary";
import { handleNewFileChange, uploadImages } from "@/utils/formHelpers";
import CloudArrowUpSvg from "@/components/icons/CloudArrowUpSvg";
import { useFormState } from "react-dom";

const Agregar = () => {
  const [inputList, setInputList] = useState<string[]>([]);
  const session = useSession();

  const [files, setFiles] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(handleNewPrompt, initialState);

  const handleUploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitBtnDisabled(true);
    const newPreviews = await handleNewFileChange(event);
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    try {
      const uploadedUrls = await uploadImages(event);
      setFiles((prevFiles) => [...prevFiles, ...(uploadedUrls as string[])]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setSubmitBtnDisabled(false);
    event.target.value = "";
  };

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        ref={formRef}
        className="bg-white p-8 rounded-lg shadow-md w-96"
        action={(e) => {
          try {
            formAction(e);
            if (formRef.current) {
              formRef.current.reset();
              setPreviews([]);
              setFiles([]);
              setInputList([]);
            }
          } catch (error) {
            console.error("Error creating prompt:", error);
          }
        }}
      >
        <input
          type="hidden"
          id="tags"
          name="tags"
          value={JSON.stringify(inputList)}
        />
        <input
          type="hidden"
          id="image"
          name="image"
          value={files[0] || ""}
        />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            id="name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="prompt"
            id="prompt"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <PromptInputList
            inputList={inputList}
            setInputList={setInputList}
          />
          <div className="bg-white p-4 rounded-md">
            <div className="flex flex-wrap gap-2">
              {inputList.map((e, idx) => {
                return (
                  <InputListItem
                    setInputList={setInputList}
                    key={idx}
                    tag={e}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-4 w-full flex justify-between items-center">
          <div className="hover:bg-gray-200 rounded-md px-2 py-4">
            <label
              htmlFor="file"
              className="flex flex-col gap-2 items-center w-fit cursor-pointer transition-all "
            >
              <div className="mb-2">
                <CloudArrowUpSvg />
              </div>
              <p className="bg-gray-200 p-2 rounded-md hover:bg-slate-400 transition-all">
                Subir imagen
              </p>
            </label>
          </div>
          <input
            name="file"
            accept="image/*"
            className=""
            type="file"
            id="file"
            multiple={false}
            onChange={handleUploadImages}
            hidden
          />
          {previews.length > 0 ? (
            previews.map((preview, index) => {
              return (
                <CldImage
                  key={index}
                  src={preview}
                  alt="preview"
                  width={144}
                  height={144}
                  className="w-36 h-36 object-cover"
                />
              );
            })
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200"></div>
          )}
        </div>
        <FormButton submitBtnDisabled={submitBtnDisabled} />
        {state.message && (
          <p className={`font-semibold text-xs italic text-center `}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Agregar;
