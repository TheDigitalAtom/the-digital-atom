export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
    >
      <div className="star-field animated-stars" />

      <div className="absolute left-[5%] top-[20%] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.035] blur-[150px]" />

      <div className="absolute right-[-12%] top-[2%] h-[760px] w-[760px] rounded-full bg-blue-500/[0.045] blur-[190px]" />

      <div className="absolute bottom-[-30%] right-[-15%] h-[700px] w-[700px] rounded-full bg-purple-500/[0.04] blur-[200px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(1,6,18,0.7)_100%)]" />
    </div>
  );
}