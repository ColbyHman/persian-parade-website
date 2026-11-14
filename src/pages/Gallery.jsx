import React, { useEffect, useRef, useState } from "react";
import albums from "../data/albums.js";
import Footer from "../components/Footer.jsx";
import { imgProps } from "../lib/images.js";
import { useI18n } from "../i18n";
import { PageHeader, Section } from "../components/ui";

// Album cards are 2-up on phones (~170px) and 3-up on desktop (~370px); modal
// tiles are 2-up on phones, 3–4-up on wider screens. Both let the browser pick
// a small srcset candidate instead of the full-size file.
const CARD_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 380px";
const TILE_SIZES = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px";

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AlbumModal({ album, onClose }) {
  const { t, num } = useI18n();
  const closeRef = useRef(null);
  const title = t("gallery.album", { year: num(album.year, { useGrouping: false }) });

  useEffect(() => {
    // Lock page scroll behind the dialog and move focus to Close.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // Close is the only focusable control: keep focus inside the dialog.
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 bg-black/95 overflow-y-auto overscroll-contain text-start"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sticky top-0 z-10 bg-pp-ink border-b-4 border-pp-gold">
        <div className="max-w-6xl mx-auto px-4 sm:px-10 py-2 sm:py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-serif font-bold text-xl sm:text-3xl leading-tight text-white">{title}</h2>
            <p className="text-sm sm:text-base text-gray-200">
              {t("gallery.photoCount", { n: num(album.images.length) })}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("gallery.close")}
            className="inline-flex items-center gap-2 min-h-11 min-w-11 px-4 rounded-full bg-white !text-pp-ink font-bold hover:bg-gray-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pp-gold"
          >
            <CloseIcon />
            <span>{t("gallery.closeLabel")}</span>
          </button>
        </div>
      </div>

      <div
        className="max-w-6xl mx-auto px-4 sm:px-10 py-4 sm:py-8 grid gap-2 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {album.images.map((src, index) => (
          <img
            key={index}
            {...imgProps(src, {
              alt: t("gallery.photoAlt", { year: num(album.year, { useGrouping: false }), n: num(index + 1) }),
              className: "rounded-lg object-cover w-full aspect-[4/3] bg-stone-800",
              sizes: TILE_SIZES,
              // Above-the-fold tiles load immediately; the rest defer so
              // opening a 20-image album doesn't queue 20 requests.
              loading: index < 6 ? "eager" : "lazy",
            })}
          />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t, num } = useI18n();
  const [activeAlbum, setActiveAlbum] = useState(null);
  const openerRef = useRef(null);
  const year = (y) => num(y, { useGrouping: false });

  const close = React.useCallback(() => {
    setActiveAlbum(null);
    // Return focus to the album card that opened the dialog.
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t("gallery.title")} intro={t("gallery.intro")} image="/images/slider/ZFNY-131-scaled.jpg" />

      <Section tone="white">
        <ul className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <li key={album.year}>
              <button
                type="button"
                onClick={(e) => {
                  openerRef.current = e.currentTarget;
                  setActiveAlbum(album);
                }}
                aria-haspopup="dialog"
                className="group block w-full h-full p-0 text-start rounded-xl overflow-hidden border border-stone-200 border-t-4 border-t-pp-green bg-white shadow-sm hover:shadow-md transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pp-green-dark"
              >
                <span className="block overflow-hidden">
                  <img
                    {...imgProps(album.cover, {
                      alt: "",
                      className:
                        "block object-cover w-full aspect-[4/3] group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none",
                      sizes: CARD_SIZES,
                      loading: "lazy",
                    })}
                  />
                </span>
                <span className="block px-3 py-2 sm:px-5 sm:py-4">
                  <span className="block font-serif font-bold text-lg sm:text-2xl text-pp-ink">
                    {t("gallery.album", { year: year(album.year) })}
                  </span>
                  <span className="block text-sm sm:text-base text-pp-gold-text font-semibold">
                    {t("gallery.photoCount", { n: num(album.images.length) })}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {activeAlbum && <AlbumModal album={activeAlbum} onClose={close} />}
      <Footer />
    </div>
  );
}
