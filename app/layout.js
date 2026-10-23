import "@fontsource/bangers/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { profile } from "@/lib/data";

export const metadata = {
  title: `${profile.handle} | ${profile.name} - Java Backend and Cybersecurity`,
  description: `${profile.name} (${profile.handle}): ${profile.tagline} Projects, certifications and the story so far.`,
  openGraph: {
    title: `${profile.handle} | ${profile.name}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.rv{opacity:1!important;transform:none!important}.loader{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
