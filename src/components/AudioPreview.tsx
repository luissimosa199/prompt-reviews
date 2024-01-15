import React, { useEffect, useState } from "react";

const AudioPreview = ({ audioBlob }: { audioBlob: Blob }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [audioBlob]);

  return (
    <div>
      {audioUrl && (
        <audio
          className="w-full"
          src={audioUrl}
          controls
        />
      )}
    </div>
  );
};

export default AudioPreview;
