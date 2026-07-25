import { useMemo } from "react";
import nav from "./data/navigation.json";
import { useActiveSection } from "./hooks/useActiveSection";
import Background from "./components/ui/Background";
import TimeMachine from "./components/ui/TimeMachine";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Lab from "./components/sections/Lab";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

export default function App() {
  const ids = useMemo(() => nav.map((n) => n.id), []);
  const active = useActiveSection(ids);

  return (
    <>
      <Background />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <MobileNav active={active} />
      <TimeMachine />

      <div className="mx-auto min-h-screen max-w-6xl px-6 pt-20 sm:px-10 lg:px-16 lg:pt-0">
        <div className="lg:flex lg:justify-between lg:gap-10">
          <Sidebar active={active} />

          <main
            id="content"
            className="pt-10 pb-16 lg:w-[54%] lg:py-24"
          >
            <About />
            <Experience />
            <Skills />
            <Lab />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </>
  );
}
