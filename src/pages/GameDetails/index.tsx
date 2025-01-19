import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Game, GameDetails } from "@/Types";

const GameDetail: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [additions, setAdditions] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_RAWGKEY;
  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}&lang=en`;
  const addURL = `https://api.rawg.io/api/games/${id}/additions?key=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGame(data);
        console.log(game?.platforms);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setLoading(false);
      });
    fetch(addURL)
      .then((response) => response.json())
      .then((data) => {
        setAdditions(data.results);
        console.log("Additions: ", additions);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 "></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="w-screen h-screen bg-black text-white flex justify-center items-center">
        <p>Error loading game details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-[100%] h-[100%] bg-black text-white p-5">
      <div className="relative">
        <Link to="/">
          <button className="bg-purple-600 text-white rounded-sm p-2 absolute top-0 left-0">
            Back to Games
          </button>
        </Link>
        <h1 className="text-center font-extrabold  text-7xl mt-10">
          {game.name}
        </h1>
        <img
          src={game.background_image}
          alt={game.name}
          className="ml-auto mr-auto rounded-md max-w-full h-auto mt-5"
        />
        <p
          className="bg-slate-800 rounded-lg p-4 mt-5"
          dangerouslySetInnerHTML={{ __html: game.description }}
        ></p>
        <p className="mt-5">
          <strong>Released:</strong> {game.released}
        </p>
        <div className="mt-3">
          <strong>Rating: </strong>
          {game.rating}/5
        </div>
        <div className="mt-3">
          <strong>Genres:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            {game.genres.map((genre) => (
              <span
                key={genre.name}
                className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <strong>Plaforms: </strong>
          {game.platforms && game.platforms.length > 0 ? (
            game.platforms.map((item) => (
              <span
                key={item.platform.id}
                className=" text-black mx-2 bg-gray-400 rounded-full py-1 px-2"
              >
                {item.platform.name}
              </span>
            ))
          ) : (
            <span>No platforms available</span>
          )}
        </div>
        <div className="mt-4">
          <strong className="block mb-2 text-lg font-semibold">
            Additions:
          </strong>
          <div className="flex justify-start space-x-10 overflow-x-auto px-4 py-2">
            {additions.length > 0 ? (
              additions.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 text-center mx-2 w-80 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={item.background_image}
                    alt="Unavailable"
                    className="rounded-t-lg h-52 w-full object-cover flex items-center justify-center"
                  />
                  <p className="p-2 font-medium">{item.name}</p>
                </div>
              ))
            ) : (
              <p>No additions available.</p>
            )}
          </div>
        </div>

        {game.website && (
          <p className="mt-5">
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Official Website
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
