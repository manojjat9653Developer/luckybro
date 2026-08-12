"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  LogOut,
  ArrowLeft,
  Pencil,
  X,
  Save,
} from "lucide-react";
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

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        console.error("Failed to load profile:", error);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const startEditing = () => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setError("");
    setSuccess("");
    setEditing(true);
  };

  const cancelEditing = () => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setError("");
    setEditing(false);
  };

  const handleSave = async () => {
    if (saving || !user) return;

    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Full name is required.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!trimmedEmail) {
      setError("Email address is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update profile.");
        return;
      }

      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);

      setSuccess("Profile updated successfully!");
      setEditing(false);

      router.refresh();
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

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
            <div className="flex items-center justify-between gap-4">

              <div className="flex min-w-0 items-center gap-4">

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

              {/* EDIT BUTTON */}
              {!editing && (
                <button
                  type="button"
                  onClick={startEditing}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  <Pencil size={16} />
                  <span className="hidden sm:inline">
                    Edit Profile
                  </span>
                </button>
              )}

            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mx-6 mt-6 rounded-xl border border-green-800 bg-green-950/40 px-4 py-3 text-sm text-green-400 sm:mx-8">
              {success}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mx-6 mt-6 rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400 sm:mx-8">
              {error}
            </div>
          )}

          {/* CONTENT */}
          <div className="p-6 sm:p-8">

            {editing ? (
              /* EDIT FORM */
              <div>
                <h3 className="mb-5 text-lg font-semibold">
                  Edit Profile
                </h3>

                <div className="space-y-5">

                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                      />

                      <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          setError("");
                          setSuccess("");
                        }}
                        placeholder="Full name"
                        disabled={saving}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-11 py-3 text-white outline-none placeholder:text-zinc-500 transition focus:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-2 block text-sm font-medium text-zinc-300"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                      />

                      <input
                        id="profile-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setError("");
                          setSuccess("");
                        }}
                        placeholder="Email address"
                        disabled={saving}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-11 py-3 text-white outline-none placeholder:text-zinc-500 transition focus:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={17} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                </div>
              </div>
            ) : (
              /* ACCOUNT DETAILS */
              <>
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

              </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
