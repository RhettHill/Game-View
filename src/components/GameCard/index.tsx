// All game data is fetched from the RAWG API: https://rawg.io/

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Game } from "@/Types";
import { Link, Location } from "react-router-dom";

const GameCard: React.FunctionComponent = () => {
  const [gameList, setGameList] = useState<Game[]>(() => {
    const savedGameList = localStorage.getItem("gameList");
    return savedGameList ? JSON.parse(savedGameList) : [];
  });
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("searchTerm") || "";
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(() => {
    return parseInt(localStorage.getItem("page") || "1", 10);
  });
  const [lastLoadedPage, setLastLoadedPage] = useState<number | null>(null);
  const apiKey = import.meta.env.VITE_RAWGKEY;

  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the search input

  // Fetch games based on search term
  const fetchGames = useCallback(
    async (query: string = "", currentPage: number = 1) => {
      setLoading(true);
      const url = query
        ? `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=15&page=${currentPage}`
        : `https://api.rawg.io/api/games?key=${apiKey}&page_size=15&page=${currentPage}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (currentPage === 1) {
          setGameList(data.results || []);
        } else {
          setGameList((prev) => {
            const newGames = data.results || [];
            const combinedGames = [...prev, ...newGames];
            const uniqueGames = Array.from(
              new Map(combinedGames.map((game) => [game.id, game])).values()
            );
            return uniqueGames;
          });
        }
        setLastLoadedPage(currentPage); // Mark this page as loaded
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, lastLoadedPage]
  );

  // Trigger search when Enter key is pressed
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchInputRef.current) {
        const trimmedSearchTerm = searchInputRef.current.value.trim();
        setSearchTerm(trimmedSearchTerm); // Set search term immediately
        setPage(1); // Reset to the first page
        setLastLoadedPage(null); // Allow re-fetch
      }
    },
    []
  );

  const loadMoreGames = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Trigger search based on the search term
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchGames(searchTerm, page); // Fetch games based on search term
    } else {
      if (page === 1) {
        fetchGames("", page); // Load default list when search term is empty
      } else {
        fetchGames(searchTerm, page); // Fetch more pages
      }
    }
  }, [fetchGames, searchTerm, page]);

  // Save state to localStorage when gameList, searchTerm, or page changes
  useEffect(() => {
    localStorage.setItem("gameList", JSON.stringify(gameList));
  }, [gameList]);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("page", page.toString());
  }, [page]);
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500"; // High rating
    if (rating >= 3) return "text-yellow-500"; // Medium rating
    return "text-red-500"; // Low rating
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-gray-400 to-gray-800 p-5">
      <div className="flex justify-center mb-5">
        <input
          ref={searchInputRef} // Using ref here
          type="text"
          placeholder="Search for a game..."
          onKeyDown={handleKeyDown} // Trigger search on Enter key
          className="px-4 py-2 rounded-lg border-2 border-gray-700 w-1/2"
        />
        <button
          onClick={() => {
            if (searchInputRef.current) {
              const trimmedSearchTerm = searchInputRef.current.value.trim();
              setSearchTerm(trimmedSearchTerm); // Set search term immediately
              setPage(1); // Reset to the first page
              setLastLoadedPage(null); // Allow re-fetch
            }
          }} // Trigger search manually when button is clicked
          className="ml-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-800"
        >
          Search
        </button>
      </div>

      {loading && page === 1 ? (
        <div className="text-center text-white">Loading games...</div>
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {gameList.map((game) => (
            <Link
              to={
                {
                  pathname: `/games/${game.id}`,
                  state: { gameList, searchTerm },
                } as unknown as Location
              }
              key={game.id}
              className="border-2 border-gray-700 w-56 m-5 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={game.background_image || "placeholder-image-url.jpg"}
                alt={game.name}
                className="w-full h-36 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold truncate">
                  {game.name || "Unknown Game"}
                </h3>
                <p className="text-gray-600 text-sm">
                  Released: {game.released || "TBD"}
                </p>
                <p
                  className={`text-sm font-bold ${getRatingColor(
                    game.rating || 0
                  )}`}
                >
                  {game.rating ? `${game.rating}/5` : "No Rating"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && gameList.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMoreGames}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            Load More
          </button>
          <footer className="static bottom-0 left-0">
            All data and information are provided by{" "}
            <a
              className="text-purple-800 border-b border-b-purple-800 hover:text-purple-400 hover:border-b-purple-400"
              href="https://rawg.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RAWG
            </a>
            .{" "}
            <span className="text-sm block">
              (Contributions and updates provided by RAWG community members)
            </span>
            This website is simply made for practice and is not official
          </footer>
        </div>
      )}
    </div>
  );
};

export default GameCard;
