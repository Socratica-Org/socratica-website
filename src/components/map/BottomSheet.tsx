import { ArrowUpRight, Calendar, Globe, X } from "lucide-react";
import { useEffect, useState } from "react";
import { InstagramIcon, TwitterIcon, YoutubeIcon } from "./SocialIcons";
import type { NodeType } from "./types";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: NodeType | null;
}

export function BottomSheet({
  open,
  onOpenChange,
  location,
}: BottomSheetProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open && location) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open, location]);

  if (!location) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 w-full bg-white border-t border-gray-200 md:hidden h-3/4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
      style={{ touchAction: "pan-y" }}
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-10 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <div className="bg-gray-50 p-5">
          <h2
            className="text-3xl"
            style={{ fontFamily: "'Tiempos Headline', serif" }}
          >
            {location.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 font-geist-mono uppercase tracking-wide">
            {location.location}
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                stroke="white"
                strokeWidth="3"
                fill="none"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-gray-700 font-geist-mono uppercase text-xs">
              {location.date}
            </span>
          </div>
        </div>

        <div className="flex-grow p-5 flex flex-col space-y-5 min-h-0">
          <div className="flex flex-col flex-grow min-h-0">
            {location.lumaLink ? (
              <iframe
                title={location.name}
                src={location.lumaLink}
                className="w-full flex-grow min-h-0 rounded-lg bg-[#F4F5F6] border-none"
              />
            ) : location.imageSrc ? (
              <img
                src={location.imageSrc}
                alt="socratica node preview"
                className="w-full flex-grow min-h-0 rounded-lg bg-[#F4F5F6] object-cover"
              />
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center">
                <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center mr-3">
                  <Calendar className="w-6 h-6 text-gray-300" />
                  <div className="text-gray-400 text-lg font-semibold">0</div>
                </div>
                <div>
                  <h4 className="text-gray-500 text-sm font-medium">
                    No Upcoming Events
                  </h4>
                  <p className="text-gray-400 text-xs">
                    Check back later for new events.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-base font-medium mb-2">Connect</h3>
            <div className="flex gap-2">
              {location.websiteLink && (
                <a
                  href={location.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <Globe size={18} />
                </a>
              )}
              {location.instagramLink && (
                <a
                  href={location.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-colors"
                >
                  <InstagramIcon size={18} />
                </a>
              )}
              {location.twitterLink && (
                <a
                  href={location.twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-sky-500 hover:bg-sky-50 hover:border-sky-300 transition-colors"
                >
                  <TwitterIcon size={18} />
                </a>
              )}
              {location.youtubeLink && (
                <a
                  href={location.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  <YoutubeIcon size={18} />
                </a>
              )}
            </div>
          </div>

          <a
            href={location.joinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-2 font-medium bg-black text-white rounded-full gap-1 hover:bg-gray-800 transition-colors"
          >
            <span>JOIN</span>
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
