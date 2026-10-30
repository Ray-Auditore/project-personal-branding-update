import { useCallback, useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BootScreen from '@/components/BootScreen';
import { shouldBoot } from '@/lib/hooks';
import { BackToTop, ScrollProgress, TapeDivider } from '@/components/Extras';

function App() {
  const [booting, setBooting] = useState<boolean>(() => shouldBoot());
  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <div className="scanlines vignette min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      {booting && <BootScreen onDone={finishBoot} />}
      <ScrollProgress />
      <Nav />
      <main>
        <Hero ready={!booting} />
        <TapeDivider />
        <About />
        <TapeDivider text="EVIDENCE — HANDLE WITH CARE" reverse />
        <Projects />
        <TapeDivider text="TIP LINE OPEN — 24HR" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
