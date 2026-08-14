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
  Camera,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserData = {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/profile", {
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
    setMessage("");
    setError("");
    setEditing(true);
  };

  const cancelEditing = () => {
    if (!user) return;

    setName(user.name);
    setEmail(user.email);
    setMessage("");
    setError("");
    setEditing(false);
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to upload avatar.");
        return;
      }

      setUser(data.user);
      setAvatarFile(null);
      setAvatarPreview(null);
      setMessage("Profile photo updated successfully.");
    } catch (error) {
      console.error("Avatar upload failed:", error);
      setError("Something went wrong while uploading the photo.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    if (saving) return;

    setMessage("");
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setError("Name and email are required.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email.");
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
          name: cleanName,
          email: cleanEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Failed to update profile.");
        return;
      }

      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);

      setMessage("Profile updated successfully.");
      setEditing(false);
    } catch (error) {
      console.error("Update profile failed:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Manage your LuckyBro account.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={startEditing}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              <Pencil size={16} />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </button>
          )}
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-5 rounded-xl border border-green-900/60 bg-green-950/20 px-4 py-3 text-sm text-green-400">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-900/60 bg-red-950/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* PROFILE CARD */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

          {/* PROFILE HEADER */}
          <div className="border-b border-zinc-800 p-6 sm:p-8">
            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="relative h-20 w-20 shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-yellow-500 text-2xl font-bold text-black">
                  {avatarPreview || user.avatar ? (
                    <img
                      src={avatarPreview || user.avatar || ""}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>

                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-zinc-950 bg-yellow-500 text-black transition hover:bg-yellow-400"
                >
                  <Camera size={15} />

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={uploadingAvatar}
                  />
                </label>
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

            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Account Details
              </h3>

              {editing && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}
            </div>

            {editing ? (
              /* EDIT FORM */
              <div className="space-y-5">

                {/* NAME INPUT */}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                    />

                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={saving}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-12 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400 disabled:opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* EMAIL INPUT */}
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                    />

                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={saving}
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-12 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400 disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* SAVE */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={18} />

                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>
            ) : (
              /* VIEW MODE */
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
            )}

            {/* LOGOUT */}
            {!editing && (
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
            )}

          </div>
        </div>
      </div>
    </main>
  );
}