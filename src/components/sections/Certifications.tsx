import { ExternalLink, ShieldCheck, Fingerprint, Activity } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const certs = [
  { id: 1, issuer: "IBM", title: "Python for Data Science, AI & Development", link: "certificates/IBM%20DATA%20SCIENCE%201.pdf", hex: "0x00A1" },
  { id: 2, issuer: "IBM", title: "Exploratory Data Analysis for Machine Learning", link: "certificates/IBM%20DATA%20SCIENCE%202.pdf", hex: "0x00A2" },
  { id: 3, issuer: "Coursera", title: "Artificial Intelligence", link: "certificates/AI%20Certifcate.pdf", hex: "0x00A3" },
  { id: 4, issuer: "Coursera", title: "Automata Theory", link: "certificates/Automata%20Cerificate.pdf", hex: "0x00A4" },
  { id: 5, issuer: "Google", title: "The Bits and Bytes of Computer Networking", link: "certificates/CN_BitsAndBytes.pdf", hex: "0x00B1" },
  { id: 6, issuer: "Coursera", title: "C++ Programming", link: "certificates/Coursera%20cpp.pdf", hex: "0x00C1" },
  { id: 7, issuer: "Coursera", title: "Simulation and Modeling of Natural Processes", link: "certificates/E22CSEU0942_EB32_%20Couirsera%20Certificate.pdf", hex: "0x00D1" },
  { id: 8, issuer: "Infosys", title: "Agile Scrum Training", link: "certificates/E22CSEU0942%20Infosys.pdf", hex: "0x00E1" },
  { id: 9, issuer: "Cisco", title: "Introduction to Packet Tracer", link: "certificates/Introduction_to_Packet_Tracer_Badge20240419-45-ix3ce1.pdf", hex: "0x00F1" },
];

export default function Certifications() {
  // Duplicate for seamless infinite scroll
  const duplicatedCerts = [...certs, ...certs, ...certs];

  return (
    <section id="certifications" className="relative z-10 scroll-mt-32 overflow-hidden py-24">
      <div className="px-2 mb-16 text-center">
        <SectionHeader title="Professional Credentials" subtitle="verified nodes" />
        <p className="text-secondary font-mono text-sm mt-4 tracking-widest uppercase">
          Hover a node to intercept and verify • Total of {certs.length} certificates online.
        </p>
      </div>
      
      <div className="relative w-[200vw] -ml-[50vw] flex overflow-hidden group/marquee py-12">
        
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-[55vw] bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[55vw] bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Global Horizontal System Wire */}
        <div className="absolute top-[3rem] left-0 right-0 h-[1px] bg-red-500/20 z-0" />
        {/* Animated blip on the wire */}
        <div className="absolute top-[3rem] left-0 w-32 h-[1px] bg-red-500 shadow-[0_0_10px_rgba(220,38,38,1)] z-0 animate-[translateX_4s_linear_infinite]" />

        <div
          className="flex gap-8 px-4 animate-marquee group-hover/marquee:[animation-play-state:paused]"
        >
          {duplicatedCerts.map((cert, index) => (
            <div 
              key={`${cert.id}-${index}`} 
              className="relative w-80 h-56 perspective-1000 shrink-0 group/card mt-4"
            >
              {/* Connecting Node Pin to the wire */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-red-500/20 group-hover/card:bg-red-500 transition-colors duration-500 z-0" />
              <div className="absolute -top-[3.2rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-2 border-red-500/50 rounded-full group-hover/card:border-red-500 group-hover:shadow-[0_0_10px_rgba(220,38,38,1)] transition-all duration-500 z-10" />

              <div className="w-full h-full relative transform-style-3d transition-transform duration-700 group-hover/card:rotate-y-180 z-20">
                
                {/* ---------------- FRONT SIDE ---------------- */}
                <div className="absolute inset-0 backface-hidden bg-surface border border-white/5 rounded-xl p-6 flex flex-col justify-between group-hover/card:border-red-500/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-red-500/80 font-bold tracking-widest uppercase">{cert.issuer}</span>
                    <span className="font-mono text-[10px] text-secondary/50">{cert.hex}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-snug">{cert.title}</h3>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="font-mono text-[9px] text-secondary/40 uppercase">Issued System Node</span>
                    <Activity className="w-4 h-4 text-secondary/40" />
                  </div>
                </div>

                {/* ---------------- BACK SIDE (Verified View) ---------------- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#050508] rounded-xl p-6 flex flex-col items-center justify-center text-background border border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.15)] overflow-hidden">
                  
                  {/* Hacker Grid Background on Back */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                  <div className="absolute top-4 left-4">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-[8px] text-secondary/30 uppercase tracking-widest">Secured Node</span>
                  </div>

                  <div className="text-center z-10 w-full mt-4">
                    <span className="block font-mono text-[9px] text-secondary tracking-widest uppercase mb-1">Verification Object</span>
                    <h4 className="text-sm font-bold text-white truncate px-2">{cert.title}</h4>
                  </div>

                  <a 
                    href={cert.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-md flex items-center gap-2 transition-colors z-10 shadow-[0_0_15px_rgba(220,38,38,0.4)] relative"
                  >
                    View PDF Certificate <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-secondary/30" />
                    <span className="font-mono text-[8px] text-secondary/30">SYS ID: #{cert.id}</span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest animate-pulse">Verified</span>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
