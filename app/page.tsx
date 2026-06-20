import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Layer 1: The Video (Absolute Bottom) */}
      <video 
        src="/background.mp4" 
        autoPlay loop muted playsInline 
        className="fixed top-0 left-0 w-screen h-screen object-cover z-[-50]" 
      />
      
      {/* Layer 2: The Dark Overlay */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#0a0a0a]/75 z-[-40]" />
      
      {/* Layer 3: The Actual Content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen pt-20">
        <Hero />
      </main>
    </div>
  );
}

