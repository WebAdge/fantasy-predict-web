import { motion } from "framer-motion";
import heroStadium from "../../assets/hero-stadium.jpg";
import trophy from "../../assets/trophy.png";
import { Trophy, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroStadium}
          alt="World Cup 2026 Stadium"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center pt-20 pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ffd700]/30 bg-[#ffd700]/10 mb-8"
        >
          <Trophy className="w-4 h-4 text-[#ffd700]" />
          <span className="text-sm font-body font-semibold tracking-wider uppercase text-[#ffd700]">
            World Cup 2026 Edition
          </span>
        </motion.div>

        {/* Trophy */}
        <motion.img
          src={trophy}
          alt="World Cup Trophy"
          width={512}
          height={768}
          className="w-32 h-auto md:w-44 mb-8 drop-shadow-2xl animate-float"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.9] tracking-tight mb-6"
        >
          <span className="text-white">Fantasy</span>
          <br />
          <span className="text-[#ffd700]">Predict</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xl text-lg md:text-xl text-white/80 font-body leading-relaxed mb-10"
        >
          Predict match results. Climb the leaderboard. Win{" "}
          <span className="text-[#ffd700] font-semibold">₦200,000</span> and prove
          you're the ultimate football oracle.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-4 rounded-xl bg-[#ffd700]/70 font-display text-lg font-bold uppercase tracking-wider text-black/80 glow-[#ffd700] hover:scale-105 transition-transform"
          onClick={() => navigate('/home')}
          >
            Start Predicting
          </button>
          <button className="px-8 py-4 rounded-xl border border-border font-display text-lg font-semibold uppercase tracking-wider text-white/80 hover:bg-muted transition-colors"
          onClick={() => navigate('/create-account')}
          >
            Create Account
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
