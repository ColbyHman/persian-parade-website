import React, { useState } from "react";
import albums from "../data/albums.js"
import Footer from "../components/Footer.jsx";

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState(null);

  return (
    <div>
      <div className="bg-white text-gray-800">
          <div className="bg-red-600 w-full py-12">
            <div className="max-w-7xl mx-auto px-6 text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Gallery</h1>
              <h2 className="text-lg max-w-3xl mx-auto">
                Check out these pictures from our previous events!
              </h2>
            </div>
          </div>
        <div className="max-w-6xl mx-auto px-6 py-20">

          {/* Album Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
              key={album.year}
              className="cursor-pointer group"
              onClick={() => setActiveAlbum(album)}
              >
                <div className="overflow-hidden rounded-lg shadow-md">
                  <img
                    src={album.cover}
                    alt={`Parade ${album.year}`}
                    className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h2 className="text-xl font-semibold mt-3 text-center">
                  Parade {album.year}
                </h2>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {activeAlbum && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto px-6 py-12">
              <button
                onClick={() => setActiveAlbum(null)}
                className="absolute top-4 right-4 text-white hover:text-red-400 border border-red-500 p-1 rounded"
                aria-label="Close gallery"
                style={{ backgroundColor: "transparent" }}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="block bg-transparent"
                  style={{ display: "block", backgroundColor: "transparent" }}
                  >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Parade {activeAlbum.year}
              </h2>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {activeAlbum.images.map((src, index) => (
                  <img
                  key={index}
                  src={src}
                  alt={`Parade ${activeAlbum.year} - ${index + 1}`}
                  className="rounded shadow-md object-cover w-full max-h-80"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
