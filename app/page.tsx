import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LandingPage } from "@/components/marketing/landing-page";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Footer />
    </>
  );
}
