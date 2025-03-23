import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useJobs } from "@/context/JobContext";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search jobs, companies, or keywords...",
  className,
  autoFocus = false,
  onSearch,
}) => {
  const { searchTerm, setSearchTerm } = useJobs();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local search term when context search term changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Auto focus the input if prop is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
    if (onSearch) {
      onSearch(localSearchTerm);
    }
    // Remove focus from input on mobile
    if (window.innerWidth < 768) {
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    setSearchTerm("");
    inputRef.current?.focus();
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative transition-all duration-300",
        isFocused ? "scale-[1.02]" : "scale-100",
        className
      )}
    >
      <div
        className={cn(
          "glass-input flex items-center px-4 py-3 rounded-xl transition-shadow duration-300",
          isFocused ? "shadow-lg ring-2 ring-primary/20" : "shadow"
        )}
      >
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-none outline-none px-3 text-gray-800 dark:text-gray-200 placeholder-gray-400"
          placeholder={placeholder}
        />

        {localSearchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
