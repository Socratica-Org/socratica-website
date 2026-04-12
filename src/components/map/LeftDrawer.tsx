import { MapPin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getContinent } from "./continent";
import type { NodeType } from "./types";
import { cn } from "./utils";

interface Props {
  locations: NodeType[];
  selectedLocationId: string | null;
  onLocationClick: (location: NodeType) => void;
  onClose: () => void;
}

export default function LeftDrawer({
  locations,
  selectedLocationId,
  onLocationClick,
  onClose,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger slide-in on mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const q = searchQuery.toLowerCase();
    return locations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q),
    );
  }, [locations, searchQuery]);

  const groupedLocations = useMemo(() => {
    const byContinent = filteredLocations.reduce<Record<string, NodeType[]>>(
      (acc, loc) => {
        const [lat, lon] = loc.coordinates;
        const key = getContinent(lat, lon);
        (acc[key] ||= []).push(loc);
        return acc;
      },
      {},
    );

    Object.values(byContinent).forEach((nodes) =>
      nodes.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    );

    return Object.entries(byContinent).sort(
      ([, a], [, b]) => b.length - a.length,
    );
  }, [filteredLocations]);

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!selectedLocationId) return;
    itemRefs.current[selectedLocationId]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedLocationId]);

  // Cumulative delay counter for staggered animations
  let itemDelay = 0;

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen w-full md:w-80 bg-white border-r border-gray-200 shadow-lg z-20 flex flex-col transition-transform duration-300 ease-out",
        mounted ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="p-4 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 z-20 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-lg text-gray-400">
            ⁂
          </div>
          <div className="w-full pr-8">
            <input
              type="text"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 px-0 py-1 text-base md:text-sm bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 transition-colors placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden scrollbar-thin">
        {groupedLocations.length === 0 ? (
          <div className="p-5 text-center text-gray-500 text-sm">
            No locations found
          </div>
        ) : (
          groupedLocations.map(([continent, continentLocations]) => (
            <div key={continent}>
              <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {continent}
                </span>
              </div>

              {continentLocations.map((location) => {
                const delay = itemDelay;
                itemDelay += 30;
                return (
                  <button
                    key={location.id}
                    onClick={() => onLocationClick(location)}
                    className={cn(
                      "w-full px-5 py-3 text-left hover:bg-gray-50 hover:translate-x-0.5 transition-all duration-200 border-b border-gray-100 group animate-fade-in-item",
                      selectedLocationId === location.id &&
                        "bg-blue-50 hover:bg-blue-50",
                    )}
                    style={{ animationDelay: `${delay}ms` }}
                    ref={(el) => {
                      itemRefs.current[location.id] = el;
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3
                          className={cn(
                            "font-medium text-sm mb-0.5",
                            selectedLocationId === location.id
                              ? "text-blue-600"
                              : "text-gray-900",
                          )}
                        >
                          {location.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{location.location}</span>
                        </div>
                      </div>
                      <MapPin
                        className={cn(
                          "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                          selectedLocationId === location.id
                            ? "opacity-100 text-blue-600"
                            : "text-gray-400",
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-200 text-center">
        <span className="text-xs text-gray-500">
          {filteredLocations.length} of {locations.length} locations
        </span>
      </div>
    </div>
  );
}
