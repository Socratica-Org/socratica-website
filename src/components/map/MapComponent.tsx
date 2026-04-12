import { List } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, {
  Marker,
  type MapMouseEvent,
  type MapRef,
} from "react-map-gl/mapbox";
import { BottomSheet } from "./BottomSheet";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import type { NodeType } from "./types";
import { cn } from "./utils";

const COLORS = [
  "bg-amber-500",
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-purple-500",
];
const TEXT_COLORS = [
  "text-amber-600",
  "text-emerald-600",
  "text-indigo-600",
  "text-rose-600",
  "text-cyan-600",
  "text-purple-600",
];

function getColorForLocation(id: string) {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const i = hash % COLORS.length;
  return { bg: COLORS[i], text: TEXT_COLORS[i] };
}

function flyToLocation(map: MapRef, loc: NodeType) {
  map.flyTo({
    center: [loc.coordinates[1], loc.coordinates[0]],
    duration: 3000,
    zoom: 7,
    offset: window.innerWidth <= 768 ? [0, -window.outerHeight * 0.35] : [0, 0],
  });
}

interface Props {
  locations: NodeType[];
  mapboxToken: string;
}

export default function MapComponent({ locations, mapboxToken }: Props) {
  const [popupInfo, setPopupInfo] = useState<NodeType | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    setListOpen(window.innerWidth >= 768);
  }, []);

  const selectLocation = (location: NodeType, fromMarker = false) => {
    if (mapRef.current) flyToLocation(mapRef.current, location);
    setPopupInfo(location);
    setDrawerOpen(true);
    if (window.innerWidth < 768) {
      setListOpen(false);
    } else {
      setListOpen(true);
    }
  };

  const handleMarkerClick = (
    location: NodeType,
    e: { originalEvent: MouseEvent },
  ) => {
    e.originalEvent.stopPropagation();
    selectLocation(location, true);
  };

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.originalEvent.target instanceof HTMLCanvasElement) {
      setDrawerOpen(false);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center font-mono">
        <p className="text-gray-600 font-medium">
          Unable to load map. Please check configuration.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen font-geist">
      {/* List toggle */}
      <button
        onClick={() => {
          setListOpen(!listOpen);
          if (window.innerWidth < 768) setDrawerOpen(false);
        }}
        className={cn(
          "fixed top-5 left-5 z-30 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-all",
          listOpen && "hidden",
        )}
      >
        <List className="w-5 h-5 text-gray-700" />
      </button>

      {/* Sidebar */}
      <LeftDrawer
        locations={locations}
        selectedLocationId={popupInfo?.id || null}
        onLocationClick={(loc) => selectLocation(loc)}
        onClose={() => setListOpen(false)}
        open={listOpen}
      />

      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{ longitude: -100, latitude: 40, zoom: 2 }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
      >
        {locations.map((location) => {
          const isHovered = hoveredId === location.id;
          const isSelected = popupInfo?.id === location.id;
          const color = getColorForLocation(location.id);

          return (
            <Marker
              key={location.id}
              longitude={location.coordinates[1]}
              latitude={location.coordinates[0]}
              anchor="center"
              onClick={(e) => handleMarkerClick(location, e)}
              className={cn(isSelected && "z-10")}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(location.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative flex items-center justify-center">
                  <div
                    className={cn(
                      "absolute inline-flex h-full w-full rounded-full opacity-75",
                      isSelected ? "animate-ping" : "duration-1000",
                      color.bg,
                    )}
                  />
                  <div
                    className={cn(
                      "relative inline-flex rounded-full transition-all duration-300",
                      color.bg,
                      isSelected
                        ? "w-6 h-6 ring-4 ring-white"
                        : isHovered
                          ? "w-5 h-5"
                          : "w-4 h-4",
                    )}
                  />
                </div>

                {(isHovered || isSelected) && (
                  <div
                    className={cn(
                      "absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-medium shadow-sm",
                      color.text,
                    )}
                  >
                    {location.name}
                  </div>
                )}
              </div>
            </Marker>
          );
        })}
      </Map>

      {/* Desktop detail panel */}
      <RightDrawer
        location={popupInfo}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />

      {/* Mobile detail panel */}
      <BottomSheet
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        location={popupInfo}
      />
    </div>
  );
}
