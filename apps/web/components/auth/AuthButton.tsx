"use client";

import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import AuthModal from "./AuthModal";
import Link from "next/link";

type UserData = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
};

export default function AuthButton() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const checkUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(null);
        setMenuOpen(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-700">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-yellow-400" />
      </div>
    );
  }

  if (user) {
    const initial = user.name.charAt(0).toUpperCase();

    return (
      <div className="relative">
        {/* USER BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Open account menu"
          className="flex items-center gap-2 rounded-xl border border-zinc-700 px-2 py-2 text-white transition hover:border-yellow-400"
        >
          {/* AVATAR */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-yellow-500 text-sm font-bold text-black">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          {/* DESKTOP NAME */}
          <span className="hidden max-w-[140px] truncate whitespace-nowrap text-sm font-medium md:block">
            {user.name}
          </span>

          {/* MOBILE NAME */}
          <span className="max-w-[70px] truncate whitespace-nowrap text-xs font-medium md:hidden">
            {user.name.split(" ")[0]}
          </span>
        </button>

        {/* DROPDOWN */}
        {menuOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">

            {/* USER INFO */}
            <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
              {/* DROPDOWN AVATAR */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-yellow-500 text-sm font-bold text-black">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initial
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user.name}
                </p>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* MY PROFILE */}
            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-yellow-400"
              >
                <User size={17} />
                My Profile
              </Link>
            </div>

            {/* LOGOUT */}
            <div className="border-t border-zinc-800 p-2">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={17} />

                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // NOT LOGGED IN
  return (
    <>
      <button
        type="button"
        aria-label="Account"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-xl border border-zinc-700 p-3 text-white transition hover:border-yellow-400 hover:text-yellow-400"
      >
        <User size={18} />
      </button>

      <AuthModal
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            checkUser();
          }
        }}
      />
    </>
  );
}