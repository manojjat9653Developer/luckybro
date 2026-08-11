"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess?: () => void;
};

type Mode = "login" | "signup" | "forgot";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function AuthModal({
  open,
  onOpenChange,
  onAuthSuccess,
}: Props) {
  const [mode, setMode] = useState<Mode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");

  const clearMessages = () => {
    setErrors({});
    setSuccess("");
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    clearMessages();
  };

  const validateEmail = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (mode === "signup" && !name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    if (mode === "signup") {
      if (!confirmPassword) {
        newErrors.confirmPassword =
          "Please confirm your password.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword =
          "Passwords do not match.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccess("");

    if (mode === "forgot") {
      if (!validateEmail()) {
        return;
      }

      setSuccess(
        "If an account exists with this email, a password reset link will be sent."
      );

      return;
    }

    if (!validateForm()) {
      return;
    }

    // LOGIN
    if (mode === "login") {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setSuccess("");
          setErrors({
            email: data.message || "Invalid email or password.",
          });
          return;
        }

        setErrors({});
        setSuccess("Login successful!");

        console.log("Logged in user:", data.user);

        // Close login modal after successful login
        setTimeout(() => {
          onOpenChange(false);
        }, 800);

        return;
      } catch (error) {
        console.error("Login request failed:", error);

        setSuccess("");
        setErrors({
          email: "Something went wrong. Please try again.",
        });

        return;
      }
    }

    // SIGNUP
    if (mode === "signup") {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setSuccess("");
          setErrors({
            email: data.message || "Unable to create account.",
          });
          return;
        }

        setErrors({});
        setSuccess("Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          onOpenChange(false);
        }, 800);

        return;
      } catch (error) {
        console.error("Signup request failed:", error);

        setSuccess("");
        setErrors({
          email: "Something went wrong. Please try again.",
        });

        return;
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-md">

        {/* FORGOT PASSWORD */}
        {mode === "forgot" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                Forgot Password?
              </DialogTitle>
            </DialogHeader>

            <div className="mt-2 text-center">
              <p className="text-sm leading-6 text-zinc-400">
                Enter your email address and we'll help you
                reset your password.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-5 space-y-4"
            >
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                    setSuccess("");
                  }}
                  className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 ${errors.email
                    ? "border-red-500"
                    : "border-zinc-800 focus:border-yellow-400"
                    }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {success && (
                <div className="rounded-xl border border-green-800 bg-green-950/40 px-4 py-3 text-sm leading-5 text-green-400">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Send Reset Link
              </button>
            </form>

            <button
              type="button"
              onClick={() => switchMode("login")}
              className="mx-auto mt-2 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-yellow-400"
            >
              <ArrowLeft size={16} />
              Back to Login
            </button>
          </>
        ) : (
          <>
            {/* TITLE */}
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                {mode === "login"
                  ? "Welcome Back"
                  : "Create Your Account"}
              </DialogTitle>
            </DialogHeader>

            {/* LOGIN / SIGNUP TOGGLE */}
            <div className="mt-4 grid grid-cols-2 rounded-xl bg-zinc-900 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={`rounded-lg py-2.5 text-sm font-semibold transition ${mode === "login"
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-400 hover:text-white"
                  }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`rounded-lg py-2.5 text-sm font-semibold transition ${mode === "signup"
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-400 hover:text-white"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {/* GOOGLE */}
            <div className="mt-5">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 py-3 font-medium text-white transition hover:bg-zinc-800"
              >
                <span className="text-lg font-bold">G</span>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-zinc-800" />

                <span className="text-xs uppercase text-zinc-500">
                  or
                </span>

                <div className="h-px flex-1 bg-zinc-800" />
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              {/* NAME */}
              {mode === "signup" && (
                <div>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        name: undefined,
                      }));
                    }}
                    className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 ${errors.name
                      ? "border-red-500"
                      : "border-zinc-800 focus:border-yellow-400"
                      }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }}
                  className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 ${errors.email
                    ? "border-red-500"
                    : "border-zinc-800 focus:border-yellow-400"
                    }`}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="relative">
                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }}
                    className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 pr-12 text-white outline-none placeholder:text-zinc-500 ${errors.password
                      ? "border-red-500"
                      : "border-zinc-800 focus:border-yellow-400"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              {mode === "signup" && (
                <div>
                  <div className="relative">
                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(
                          e.target.value
                        );
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                      }}
                      className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 pr-12 text-white outline-none placeholder:text-zinc-500 ${errors.confirmPassword
                        ? "border-red-500"
                        : "border-zinc-800 focus:border-yellow-400"
                        }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* FORGOT PASSWORD */}
              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="text-sm text-yellow-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div className="rounded-xl border border-green-800 bg-green-950/40 px-4 py-3 text-sm text-green-400">
                  {success}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-500 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                {mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            {/* BOTTOM SWITCH */}
            <p className="mt-4 text-center text-sm text-zinc-500">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() =>
                  switchMode(
                    mode === "login"
                      ? "signup"
                      : "login"
                  )
                }
                className="font-medium text-yellow-400 hover:underline"
              >
                {mode === "login"
                  ? "Sign Up"
                  : "Login"}
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}