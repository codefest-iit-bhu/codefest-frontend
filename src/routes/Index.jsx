import React, { useState, useEffect } from 'react';
import GlitchText from '../components/GlitchedCodeFest';
import Link from '../components/Link';
import { useAuth } from "../utils/islogged"
import LogoutButton from '../components/LogoutButton';

export default function Home() {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white p-10">
      <div className="absolute top-4 right-4">
        {isLoggedIn && (
          <LogoutButton />
        )}
      </div>

      <div className="w-[400px]">
        <GlitchText />
      </div>
      <div className="p-3 w-[400px] flex justify-center">
        <Link text="Explore" href="/home" />
      </div>
      

      {!isLoggedIn && (
        <>
          <div className="p-3 w-[400px] flex justify-center">
            <Link text="Login" href="/login" />
          </div>
          <div className="p-3 w-[400px] flex justify-center">
            <Link text="Signup" href="/signup" />
          </div>
        </>
      )}

      <div className="p-3 w-[400px] flex justify-center">
        <Link text="Campus Ambassador" href="/CA" />
      </div>
    </div>
  );
}
