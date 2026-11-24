import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Control Desk · Factory", description: "Synthetic operator workspace for the Chief Operator Agency & Software Factory." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
