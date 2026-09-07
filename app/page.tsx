import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import AIGenerator from "@/components/AIGenerator";
import Ecosystem from "@/components/Ecosystem";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Analytics from "@/components/Analytics";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <AIGenerator />
      <Ecosystem />
      <Industries />
      <WhyUs />
      <Process />
      <Analytics />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}
