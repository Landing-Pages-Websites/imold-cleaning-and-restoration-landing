import type { JSX } from "react";
import { QueryParamPersistence } from "@/components/QueryParamPersistence";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { OfferCallout } from "@/components/OfferCallout";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { ServiceArea } from "@/components/ServiceArea";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function Page(): JSX.Element {
  return (
    <>
      <QueryParamPersistence />
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WhyUs />
        <OfferCallout />
        <HowItWorks />
        <Testimonials />
        <ServiceArea />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
