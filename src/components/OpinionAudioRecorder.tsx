import { uploadAudio } from "@/utils/formHelpers";
import React, { useEffect, useState } from "react";
import AudioPreview from "./AudioPreview";

const OpinionAudioRecorder = ({
  setUploadedAudio,
}: {
  setUploadedAudio: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Request permissions and create MediaRecorder
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      // Collect the audio data when available
      const audioChunks: BlobEvent["data"][] = [];
      recorder.ondataavailable = (event) => audioChunks.push(event.data);

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);

        try {
          const uploadedUrl = await uploadAudio(audioBlob);
          setUploadedAudio(uploadedUrl);
        } catch (error) {
          console.error("Upload error:", error);
        }
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = () => {
    setAudioBlob(null);
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex mt-4 w-full flex-col gap-2">
      <button
        className={`${
          !isRecording ? "bg-gray-300" : "bg-gray-100 animate-pulse"
        } rounded-md p-2`}
        onClick={startRecording}
        disabled={isRecording}
      >
        {isRecording ? "Grabando" : "Iniciar"}
      </button>
      <button
        className={`${
          isRecording ? "bg-gray-300" : "bg-gray-100"
        } rounded-md p-2`}
        onClick={stopRecording}
        disabled={!isRecording}
      >
        Detener
      </button>

      {audioBlob && <AudioPreview audioBlob={audioBlob} />}
    </div>
  );
};

export default OpinionAudioRecorder;
