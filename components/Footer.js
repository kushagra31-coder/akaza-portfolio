import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">AKAZA.</div>
        <p>
          &copy; {new Date().getFullYear()} {profile.name} aka {profile.handle}. Built with Next.js, caffeine and a
          lot of halftone dots.
        </p>
      </div>
    </footer>
  );
}
