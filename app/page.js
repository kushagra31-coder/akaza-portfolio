import Loader from "@/components/Loader";
import WebCanvas from "@/components/WebCanvas";
import Cursor from "@/components/Cursor";
import ClickSpark from "@/components/ClickSpark";
import ScrollBar from "@/components/ScrollBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Certs from "@/components/Certs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <WebCanvas />
      <Cursor />
      <ClickSpark />
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Certs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
