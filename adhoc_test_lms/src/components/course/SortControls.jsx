// src/components/course/SortControls.jsx
import * as React from "react";
import { ChevronDown, SlidersHorizontal, BarChart, Clock } from "lucide-react";

export function SortControls({
  sortBy,
  onSortChange,
  level,
  onLevelChange,
  priceRange,
  onPriceRangeChange,
  duration,
  onDurationChange,
}) {
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [isLevelOpen, setIsLevelOpen] = React.useState(false);
  const [isDurationOpen, setIsDurationOpen] = React.useState(false);

  const sortRef = React.useRef(null);
  const levelRef = React.useRef(null);
  const durationRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setIsLevelOpen(false);
      }
      if (durationRef.current && !durationRef.current.contains(event.target)) {
        setIsDurationOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const durationOptions = [
    { value: "all", label: "Any Duration" },
    { value: "short", label: "Short (< 10 hrs)" },
    { value: "medium", label: "Medium (10-30 hrs)" },
    { value: "long", label: "Long (> 30 hrs)" },
  ];

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
    setIsLevelOpen(false);
    setIsDurationOpen(false);
  };

  const toggleLevel = () => {
    setIsLevelOpen(!isLevelOpen);
    setIsSortOpen(false);
    setIsDurationOpen(false);
  };

  const toggleDuration = () => {
    setIsDurationOpen(!isDurationOpen);
    setIsSortOpen(false);
    setIsLevelOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-auto" ref={sortRef}>
          <button
            type="button"
            onClick={toggleSort}
            className="flex items-center justify-between gap-2 w-full sm:w-auto px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">
                Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          {isSortOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-surface-container rounded-xl shadow-lg border border-outline-variant overflow-hidden z-20">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high transition ${
                    sortBy === option.value
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-on-surface"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Level (Difficulty) Filter Dropdown */}
        <div className="relative w-full sm:w-auto" ref={levelRef}>
          <button
            type="button"
            onClick={toggleLevel}
            className="flex items-center justify-between gap-2 w-full sm:w-auto px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">
                Difficulty: {levelOptions.find((l) => l.value === level)?.label}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-200 ${isLevelOpen ? "rotate-180" : ""}`} />
          </button>

          {isLevelOpen && (
            <div className="absolute left-0 mt-2 w-full sm:w-48 bg-surface-container rounded-xl shadow-lg border border-outline-variant overflow-hidden z-20">
              {levelOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onLevelChange(option.value);
                    setIsLevelOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high transition ${
                    level === option.value
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-on-surface"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duration Filter Dropdown */}
        <div className="relative w-full sm:w-auto" ref={durationRef}>
          <button
            type="button"
            onClick={toggleDuration}
            className="flex items-center justify-between gap-2 w-full sm:w-auto px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">
                Duration: {durationOptions.find((d) => d.value === duration)?.label}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-secondary transition-transform duration-200 ${isDurationOpen ? "rotate-180" : ""}`} />
          </button>

          {isDurationOpen && (
            <div className="absolute left-0 mt-2 w-full sm:w-48 bg-surface-container rounded-xl shadow-lg border border-outline-variant overflow-hidden z-20">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onDurationChange(option.value);
                    setIsDurationOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high transition ${
                    duration === option.value
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-on-surface"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
