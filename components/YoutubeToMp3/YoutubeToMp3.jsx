"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Spotlight } from "../../components/ui/spotlight-new";
import { PlaceholdersAndVanishInput } from "../../components/ui/placeholders-and-vanish-input";
import Navbar from "../navbar/Navbar";

const YoutubeToMp3 = () => {
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [title, setTitle] = useState("YouTube To MP3 Converter");
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Paste the full YouTube video URL here",
    "Enter a YouTube link to convert to MP3",
    "Example: https://www.youtube.com/watch?v=abcd1234",
    "Convert YouTube video to audio in one click",
    "Type or paste a valid YouTube video link",
  ];

  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);
      return searchParams.get("v") || "";
    } catch (error) {
      console.error("Invalid URL:", error);
      return "";
    }
  };

  useEffect(() => {
    handleSubmit;
  }, [downloadLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) return;

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Please Enter Full URL");
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch("/api/mp3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
        return;
      }

      setDownloadLink(data.final);
      setTitle(data.song_title || "Download Ready");
      console.log("Download URL set:", data.final);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during conversion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadButton = () => {
    setTitle("YouTube to MP3 Converter");
    setUrl("");
    setDownloadLink("");
  };

  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden flex justify-center  p-4 sm:p-20 gap-8 font-sans">
        <Spotlight />

        <div className="w-full max-w-2xl text-center">
          <div className="flex flex-col justify-center items-center mb-6">
            <h2 className="w-full truncate whitespace-nowrap overflow-hidden text-ellipsis mb-0 sm:mb-5 text-xl text-center sm:text-4xl dark:text-white text-black">
              {title}
            </h2>
          </div>

          <div className="space-y-4">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onSubmit={handleSubmit}
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading || !url}
              className="w-full max-w-[300px] shadow-4xl bg-[#e68e00] hover:bg-[#f8a217eb] text-white font-medium py-3 my-3 rounded-full px-6  transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Convert to MP3"}
            </button>
            <h5 className="text-red-400 text-[12px]">
              {" "}
              {error && "Enter Full & Valid Url"}
            </h5>
          </div>

          {downloadLink && (
            <div className="mt-6 text-center">
              <a
                href={downloadLink}
                download
                onClick={handleDownloadButton}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Download MP3
              </a>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Click the button above to download your audio
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default YoutubeToMp3;