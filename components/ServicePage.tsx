import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ServicePageProps = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  secondaryAccent: string;
  capabilities: string[];
};

export default function ServicePage({
  number,
  title,
  eyebrow,
  description,
  accent,
  secondaryAccent,
  capabilities,
}: ServicePageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02030b] text-white">
      <Navbar />

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-24 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${accent}30, transparent 68%)`,
          }}
        />

        <div
          className="absolute -right-48 top-1/3 h-[32rem] w-[32rem] rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${secondaryAccent}24, transparent 70%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(90,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(90,160,255,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-[1500px] items-center px-5 pb-24 pt-40 sm:px-8 lg:px-12">
        <div className="grid w-full gap-16 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 backdrop-blur-xl">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 16px ${accent}`,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200/80">
                Service System {number}
              </span>
            </div>

            <p className="mt-10 font-mono text-xs uppercase tracking-[0.38em] text-cyan-300/75">
              {eyebrow}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">
              {title}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-7 py-3.5 text-sm font-medium text-cyan-100 transition duration-300 hover:border-cyan-200/65 hover:bg-cyan-300/20 hover:shadow-[0_0_40px_rgba(44,204,255,0.2)]"
              >
                Start a project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm text-white/65 transition duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                Return to universe
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-10 rounded-full blur-[90px]"
              style={{
                background: `radial-gradient(circle, ${accent}32, transparent 70%)`,
              }}
            />

            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#050a18]/70 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(circle at 80% 0%, ${accent}26, transparent 42%)`,
                }}
              />

              <div
                className="absolute inset-x-8 top-0 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/38">
                    System capabilities
                  </p>

                  <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: accent,
                        boxShadow: `0 0 14px ${accent}`,
                      }}
                    />
                    Online
                  </span>
                </div>

                <div className="mt-8 space-y-3">
                  {capabilities.map((capability, index) => (
                    <div
                      key={capability}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 py-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.065]"
                    >
                      <div
                        className="absolute inset-y-0 left-0 w-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          backgroundColor: accent,
                          boxShadow: `0 0 16px ${accent}`,
                        }}
                      />

                      <div className="flex items-center gap-5">
                        <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-300/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="text-sm font-medium text-white/78 sm:text-base">
                          {capability}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/20 px-5 py-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/30">
                    The Digital Atom
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/52">
                    Every system is designed around strategy, performance,
                    accessibility and a distinct visual identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}