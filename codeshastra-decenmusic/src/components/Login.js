import React from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=86ca3eda8de34017a97a9c44d8a02991&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="bg-orange-500 py-2 px-4 rounded-lg">
        <a className="text-white" href={AUTH_URL}>
          Login With Spotify
        </a>
      </div>
    </div>
  );
}
