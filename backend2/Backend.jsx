import React from 'react';

const API_TOKEN = "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";

const Backend = {
  handleSubmit: async (event) => {
    event.preventDefault();

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },
};

export default Backend;
