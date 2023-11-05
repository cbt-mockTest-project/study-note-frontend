import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import RootLayout from "@/ui/layout/RootLayout";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모두의 암기장",
  description: "나만의 암기장을 만들어서 공부하고, 공유 할 수 있는 서비스",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <RootLayout>{children}</RootLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
