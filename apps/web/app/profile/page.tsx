"use client";

import { useEffect, useState } from "react";
import { User, Mail, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserData = {
  id: number;
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/");
          return;
        }

        const data = await response.json();

        if (!data.success || !data.user) {
          router.replace("/");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Failed to load profile:", error);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="animate-pulse">
            <div className="h-8 w-40 rounded bg-zinc-900" />
            <div className="mt-8 h-64 rounded-2xl bg-zinc-900" />
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* BACK */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-400"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your LuckyBro account.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

          {/* PROFILE HEADER */}
          <div className="border-b border-zinc-800 p-6 sm:p-8">
            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-500 text-2xl font-bold text-black">
                {initial}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold sm:text-2xl">
                  {user.name}
                </h2>

                <p className="mt-1 truncate text-sm text-zinc-400">
                  {user.email}
                </p>
              </div>

            </div>
          </div>

          {/* ACCOUNT DETAILS */}
          <div className="p-6 sm:p-8">

            <h3 className="mb-5 text-lg font-semibold">
              Account Details
            </h3>

            <div className="space-y-4">

              {/* NAME */}
              <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                  <User size={18} className="text-yellow-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">
                    Full Name
                  </p>

                  <p className="mt-1 truncate font-medium">
                    {user.name}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
                  <Mail size={18} className="text-yellow-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">
                    Email Address
                  </p>

                  <p className="mt-1 truncate font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* USER ID */}
              <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-bold text-yellow-400">
                  #
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    User ID
                  </p>

                  <p className="mt-1 font-medium">
                    #{user.id}
                  </p>
                </div>
              </div>

            </div>

            {/* LOGOUT */}
            <div className="mt-8 border-t border-zinc-800 pt-6">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-900/60 bg-red-950/20 px-4 py-3 font-medium text-red-400 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={18} />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}