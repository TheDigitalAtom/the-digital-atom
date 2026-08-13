export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      {/* 
        MOBILE:
        Keep the background lightweight.
        No animated star layer and no giant
        GPU-heavy blur circles.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(37,99,235,0.11),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.07),transparent_30%),linear-gradient(to_bottom,#020611_0%,#01040c_100%)] md:hidden" />

      {/* Small static mobile stars */}
      <div
        className="
          absolute
          inset-0
          md:hidden

          bg-[radial-gradient(circle,rgba(255,255,255,0.45)_1px,transparent_1px)]
          [background-size:42px_42px]
          opacity-[0.16]
        "
      />

      {/* 
        DESKTOP:
        Preserve the richer cinematic version.
      */}
      <div className="hidden md:block">
        <div className="star-field animated-stars" />

        <div className="absolute left-[5%] top-[20%] h-[360px] w-[360px] rounded-full bg-cyan-400/[0.03] blur-[110px]" />

        <div className="absolute right-[-10%] top-[4%] h-[620px] w-[620px] rounded-full bg-blue-500/[0.04] blur-[140px]" />

        <div className="absolute bottom-[-24%] right-[-12%] h-[560px] w-[560px] rounded-full bg-purple-500/[0.035] blur-[150px]" />
      </div>

      {/* Global vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(1,6,18,0.72)_100%)]" />
    </div>
  );
}