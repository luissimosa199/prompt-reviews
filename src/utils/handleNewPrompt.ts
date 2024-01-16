"use server";
export const handleNewPrompt = (formData: FormData) => {
  const name = formData.get("name");
  const prompt = formData.get("prompt");

  const promptData = {
    name,
    prompt,
  };

  console.log(promptData);
};
