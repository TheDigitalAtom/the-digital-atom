"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Orbit,
  Send,
  Sparkles,
} from "lucide-react";

const contactEmail = "thedigitalatom@hotmail.com";

type FormStatus = "idle" | "opening";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const budget = String(form.get("budget") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      `New project inquiry from ${name || "Website visitor"}`,
    );

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "Not provided"}`,
        `Service: ${service || "Not selected"}`,
        `Budget: ${budget || "Not selected"}`,
        "",
        "Project details:",
        message,
      ].join("\n"),
    );

    setStatus("opening");

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setStatus("idle");
    }, 1200);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.13),transparent_42%)]"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 35, 0],
          y: [0, -24, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-[12%] top-[5%] h-[650px] w-[650px] rounded-full bg-cyan-500/[0.065] blur-[190px]"
      />

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -30, 0],
          y: [0, 28, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[18%] right-[-10%] h-[720px] w-[720px] rounded-full bg-purple-600/[0.08] blur-[210px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:sticky lg:top-32"
          >
            <p className="mb-5 font-[var(--font-poppins)] text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Start a project
            </p>

            <h2 className="font-[var(--font-orbitron)] text-4xl font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-5xl lg:text-6xl">
              Let&apos;s build
              <span className="gradient-text mt-2 block">
                something remarkable
              </span>
            </h2>

            <p className="mt-7 max-w-xl font-[var(--font-poppins)] text-base leading-8 text-slate-300 sm:text-lg">
              Have an idea, a business that needs a stronger digital presence,
              or a project ready for its next stage? Send the details and
              begin the transmission.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${contactEmail}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.09] bg-[#071020]/65 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/[0.035]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.04]">
                  <Mail
                    size={21}
                    strokeWidth={1.5}
                    className="text-cyan-300"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Direct transmission
                  </p>

                  <p className="mt-1 truncate font-[var(--font-poppins)] text-sm text-white sm:text-base">
                    {contactEmail}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="ml-auto shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <div className="rounded-2xl border border-white/[0.09] bg-[#071020]/65 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/[0.04]">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-2 rounded-full border border-dashed border-purple-400/30"
                    />

                    <Orbit
                      size={21}
                      strokeWidth={1.5}
                      className="relative text-purple-300"
                    />
                  </div>

                  <div>
                    <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Project availability
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <motion.span
                        animate={{
                          opacity: [0.4, 1, 0.4],
                          scale: [0.85, 1, 0.85],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]"
                      />

                      <p className="font-[var(--font-poppins)] text-sm text-slate-300">
                        Accepting new projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                "Custom strategy",
                "Responsive development",
                "Premium visual direction",
                "Clear project communication",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 font-[var(--font-poppins)] text-sm text-slate-400"
                >
                  <CheckCircle2
                    size={17}
                    strokeWidth={1.5}
                    className="shrink-0 text-cyan-300"
                  />

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#06101f]/80 p-6 shadow-[0_0_90px_rgba(30,64,175,0.12)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.09] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-purple-500/[0.09] blur-[110px]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
            />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between gap-5">
                <div>
                  <p className="font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    Project interface
                  </p>

                  <h3 className="mt-2 font-[var(--font-orbitron)] text-xl font-semibold uppercase tracking-[0.06em] text-white sm:text-2xl">
                    Initialize transmission
                  </h3>
                </div>

                <div className="relative hidden h-14 w-14 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.035] sm:flex">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-2 rounded-full border border-dashed border-blue-400/35"
                  />

                  <Sparkles
                    size={21}
                    strokeWidth={1.4}
                    className="relative text-cyan-300"
                  />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-5 sm:grid-cols-2"
              >
                <label className="block">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Your name
                  </span>

                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="h-14 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 font-[var(--font-poppins)] text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Email address
                  </span>

                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="h-14 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 font-[var(--font-poppins)] text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Company
                  </span>

                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company or brand"
                    className="h-14 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 font-[var(--font-poppins)] text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Service
                  </span>

                  <select
                    required
                    name="service"
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-white/[0.09] bg-[#071020] px-4 font-[var(--font-poppins)] text-sm text-white outline-none transition-all focus:border-cyan-300/45 focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    <option value="Web Design">Web Design</option>
                    <option value="Web Development">
                      Web Development
                    </option>
                    <option value="Branding">Branding</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Estimated budget
                  </span>

                  <select
                    name="budget"
                    defaultValue=""
                    className="h-14 w-full rounded-xl border border-white/[0.09] bg-[#071020] px-4 font-[var(--font-poppins)] text-sm text-white outline-none transition-all focus:border-cyan-300/45 focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  >
                    <option value="" disabled>
                      Select a budget range
                    </option>

                    <option value="Under $2,500">Under $2,500</option>
                    <option value="$2,500–$5,000">$2,500–$5,000</option>
                    <option value="$5,000–$10,000">$5,000–$10,000</option>
                    <option value="$10,000+">$10,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block font-[var(--font-poppins)] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Project details
                  </span>

                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, goals and timeline..."
                    className="w-full resize-none rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-4 font-[var(--font-poppins)] text-sm leading-7 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-300/45 focus:bg-cyan-300/[0.025] focus:shadow-[0_0_25px_rgba(49,215,255,0.07)]"
                  />
                </label>

                <div className="sm:col-span-2">
                  <motion.button
                    type="submit"
                    disabled={status === "opening"}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-4 rounded-xl border border-cyan-300/45 bg-cyan-300/[0.07] px-7 py-4 font-[var(--font-poppins)] text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_35px_rgba(49,215,255,0.12)] transition-colors hover:bg-cyan-300/[0.12] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "opening"
                      ? "Opening transmission"
                      : "Send project inquiry"}

                    <Send
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </motion.button>

                  <p className="mt-4 text-center font-[var(--font-poppins)] text-[10px] leading-5 text-slate-600">
                    Submitting opens your default email application with the
                    project details prepared.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}