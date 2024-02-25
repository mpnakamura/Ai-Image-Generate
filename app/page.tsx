"use client";
import React, { useState } from "react";
import Image from "next/image";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
    setIsLoading(false);
    setShowModal(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-6xl font-bold text-center text-blue-600">
          画像生成AI
        </h1>
        <p className="mt-4 text-xl text-center text-gray-400">
          あなたの頭の中を画像で具現化します
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <input
            id="imageInput"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="イメージを詳細に入力してください"
            className="w-full p-5 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
          />
          <button
            type="submit"
            className="w-full mt-6 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {isLoading ? "生成中..." : "画像生成"}
          </button>
        </form>

        {imageUrl && showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg mx-auto">
              <h4 className="mb-1 font-bold text-black text-center break-words">
                プロンプト: {prompt}
              </h4>
              <Image src={imageUrl} alt="ai image" width={500} height={500} />
              <button
                className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                onClick={() => setShowModal(false)}
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
