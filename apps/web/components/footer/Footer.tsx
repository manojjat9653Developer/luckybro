import Link from "next/link";
import Container from "@/components/layout/Container";
import { Trophy } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800 bg-zinc-950">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-4">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              <span className="text-xl font-bold text-yellow-400">
                LuckyBro
              </span>
            </div>

            <p className="mt-4 text-sm text-zinc-400">
              India's next generation gaming platform with secure wallet,
              instant withdrawals and exciting games.
            </p>
          </div>

          {/* Games */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Games</h3>

            <div className="space-y-2 text-zinc-400">
              <Link href="/games/crash" className="block hover:text-yellow-400">
                Crash
              </Link>

              <Link href="/games/mines" className="block hover:text-yellow-400">
                Mines
              </Link>

              <Link href="/games/plinko" className="block hover:text-yellow-400">
                Plinko
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>

            <div className="space-y-2 text-zinc-400">
              <Link href="/" className="block hover:text-yellow-400">
                About
              </Link>

              <Link href="/" className="block hover:text-yellow-400">
                Contact
              </Link>

              <Link href="/" className="block hover:text-yellow-400">
                Terms
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Follow Us
            </h3>

            <div className="flex gap-5 text-2xl">
  <FaXTwitter className="cursor-pointer transition hover:text-yellow-400" />
  <FaInstagram className="cursor-pointer transition hover:text-yellow-400" />
  <FaYoutube className="cursor-pointer transition hover:text-yellow-400" />
</div>
          </div>

        </div>

        <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
          © 2026 LuckyBro. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}