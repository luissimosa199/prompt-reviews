import React, { ChangeEvent, useRef, useState } from "react";
import ItemPageRank from "./ItemPageRank";
import { handleNewFileChange, uploadImages } from "@/utils/formHelpers";
import { CldImage } from "next-cloudinary";
import OpinionAudioRecorder from "./OpinionAudioRecorder";

const ItemPageOpinionsInput = ({
  name,
  itemId,
}: {
  name: string;
  itemId: string;
}) => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<"OK" | "ERROR" | null>(null);
  const [error, setError] = useState<{ comment: boolean; rank: boolean }>({
    comment: false,
    rank: false,
  });
  const [files, setFiles] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false);
  const [showAudioRecorder, toggleAudioRecorder] = useState<boolean>(false);
  const [uploadedAudio, setUploadedAudio] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const sendOpinion = async (data: {}) => {
    const dataWithFiles = { ...data, files, audio: uploadedAudio };

    const response = await fetch("/api/opinions", {
      method: "POST",
      body: JSON.stringify(dataWithFiles),
    });

    if (!response.ok) {
      setSubmitState("ERROR");
    } else {
      setSubmitState("OK");
      formRef.current?.reset();
      setSelectedStar(null);
      setPreviews([]);
      setFiles([]);
      setUploadedAudio(null);
      toggleAudioRecorder(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form.entries());

    if (!selectedStar) {
      setError((prev) => ({ ...prev, rank: true }));
      return null;
    }

    setError((prev) => ({ ...prev, rank: false }));

    if (!formData.comment) {
      setError((prev) => ({ ...prev, comment: true }));
      return null;
    }

    setError((prev) => ({ ...prev, comment: false }));

    const data = {
      rank: selectedStar + 1,
      name: formData.name,
      email: formData.email,
      subscribe: !!formData.subscribe,
      comment: formData.comment,
      promptName: name,
      promptId: itemId,
    };

    sendOpinion(data);
  };

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

  return (
    <div
      id="comment_input"
      className="p-4 max-w-3xl mx-auto"
    >
      <div className="h-full shadow-md p-4">
        <div>
          {submitState === "ERROR" && (
            <div className="p-2 bg-red-300 font-semibold shadow-md mb-3">
              <h3>
                Ha ocurrido un error al enviar el comentario, recarga la pagina
                e intenta de nuevo.
              </h3>
            </div>
          )}
          {submitState === "OK" && (
            <div className="p-2 bg-green-300 font-semibold shadow-md mb-3">
              <h3>
                Tu comentario ha sido enviado para evaluación y será publicado
                pronto.
              </h3>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-2xl mb-4">
            Agrega tu comentario para{" "}
            <strong className="capitalize">{name.toLowerCase()}</strong>
          </h3>
          <div>
            <span className="text-lg mb-2">Ingresa tu calificación</span>
            <ItemPageRank
              selectedStar={selectedStar}
              setSelectedStar={setSelectedStar}
            />
          </div>
          <div>
            {error.rank && (
              <span className="text-red-600 font-semibold">
                Debe dar una calificación
              </span>
            )}
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            ref={formRef}
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-lg"
              >
                Nombre (opcional)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ej. Juan Perez"
                className="rounded-md border p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-lg"
              >
                Email (opcional)
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Ej. juanperez@gmail.com"
                className="rounded-md border p-2"
              />
              <span className="font-semibold text-sm">
                *Tu email no será público
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="subscribe"
                id="subscribe"
                defaultChecked={true}
              />
              <label htmlFor="subscribe text-lg">
                Deseo recibir información
              </label>
            </div>
            <div>
              <div className="flex gap-2">
                <label
                  htmlFor="file"
                  className="flex gap-2 items-center w-fit h-8 cursor-pointer rounded-md p-2 bg-gray-200 hover:bg-slate-400 transition-all "
                >
                  Subir imagen o video
                </label>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleAudioRecorder((prev) => !prev);
                  }}
                  className="flex gap-2 items-center w-fit h-8 cursor-pointer rounded-md p-2 bg-gray-200 hover:bg-slate-400 transition-all"
                >
                  Grabar audio
                </button>
              </div>

              <input
                name="file"
                accept="*"
                className=""
                type="file"
                id="file"
                multiple
                onChange={handleUploadImages}
                hidden
              />

              <div className="my-2 flex gap-2 w-full">
                {showAudioRecorder && (
                  <OpinionAudioRecorder setUploadedAudio={setUploadedAudio} />
                )}

                {previews.map((preview, index) => {
                  if (previews.includes("video")) {
                    return (
                      <video
                        key={index}
                        src={preview}
                        className="w-20 h-20 object-cover"
                        controls
                      />
                    );
                  }
                  return (
                    <CldImage
                      key={index}
                      src={preview}
                      alt="preview"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="comment text-lg">Comentario</label>
              <div>
                {error.comment && (
                  <span className="text-red-600 font-semibold">
                    Debe dar un comentario
                  </span>
                )}
              </div>
              <textarea
                id="comment"
                name="comment"
                placeholder="Escribe tu comentario..."
                className="rounded-md border p-2"
              ></textarea>
            </div>
            <button
              disabled={submitBtnDisabled}
              className="px-4 py-4 bg-blue-500 font-semibold text-white w-fit rounded-md"
            >
              Enviar comentario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemPageOpinionsInput;
