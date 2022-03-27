import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SpotifyWebApi from "spotify-web-api-node";

const Searchbar = ({ setSong }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  var SpotifyWebApi = require("spotify-web-api-node");

  let spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(
    "BQDomUGTuIlezVCQbGPr_-iWzrJjwuiZzn-1LrFBXKTVceK_usUMjdjXEgpB9-XCh2BCAcpXRmLQs2Sfr9mQPOmtlhmmJzivkEGIOPAmJQfJLnq4k3wE-Bh9ewkyzCICEJ6keYHWvYEmJpMieqPZbV-2lXfhd-4cV9AjY0nAtRUDyrLDQbuFCLbsTexTa83X0nE1w5jxnRXINpNqrAYs"
  );

  useEffect(() => {
    if (!search) return setResults([]);
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            image: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search]);

  return (
    <div className="md:px-8 px-6">
      <div className="mt-2 w-full flex justify-center items-center bg-white rounded-full px-4">
        <BiSearchAlt className="h-6 w-6" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for Artists/Songs"
          className="flex-1 p-4 rounded-full focus:border-0 focus:outline-none"
        />
      </div>
      <div
        className={`space-y-2 mt-2 bg-slate-200 rounded-2xl ${
          search ? "h-64 overflow-y-auto" : ""
        }`}
      >
        {results.map((result) => {
          return (
            <div
              key={result.id}
              className="flex p-2 items-center space-x-4 w-full hover:cursor-pointer rounded-2xl"
              onClick={() => {
                setResults([]);
                setSearch("");
                setSong(result);
              }}
            >
              <img
                src={result.image}
                alt={result.title}
                className="h-12 w-12 rounded-xl"
              />
              <div>
                <div className="font-bold text-md truncate w-64">
                  {result.title}
                </div>
                <div className="text-sm">{result.artist}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
//drop down results
export default Searchbar;
