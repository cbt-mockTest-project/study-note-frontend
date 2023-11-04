import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "모두의 암기장",
  description: "나만의 암기장을 만들어서 공부하고, 공유 할 수 있는 서비스",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
