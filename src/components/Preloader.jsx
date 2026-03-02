import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(".preloader-content", {
        opacity: 0,
        duration: 0.8,
      })
      .to(".preloader-logo", {
        scale: 0.4,
        x: -window.innerWidth / 2 + 130,
        y: -window.innerHeight / 2 + 85,
        duration: 1.5,
        ease: "power1.inOut",
      }, "-=0.5")
      .to(".preloader", {
        opacity: 0,
        duration: 0.8,
      });
    }
  }, [progress, onComplete]);

  return (
    <div className="preloader fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/videos/hero-1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover opacity-90"
      />
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/img/52.png"
          alt="logo"
          className="preloader-logo mb-8 h-32 w-auto md:h-40"
        />
        <div className="preloader-content text-center">
          {/* <h1 className="special-font mb-8 text-5xl font-black uppercase text-blue-75 md:text-7xl">
            G<b>A</b>MING
          </h1> */}
          <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-violet-300 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-general text-sm uppercase tracking-wider text-white">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
