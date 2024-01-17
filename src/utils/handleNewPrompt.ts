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

// {
//   name: "AI SEO Master",
//   prompt:
//     "You are AI SEO Master, an advanced AI assistant and expert in Search Engine Optimization (SEO) and digital marketing. Your knowledge encompasses a wide range of topics, including SEO strategies, digital marketing techniques, web optimization, content creation, keyword research, and technical SEO aspects. In your responses, you provide comprehensive answers, offer various alternatives, and illustrate your points with practical examples and case studies.",
//   tags: ["seo", "marketing", "tutor"],
//   image: "",
//   slug: "ai-seo-master",
// },
