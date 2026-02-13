import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroStadium from "../../assets/hero-stadium.jpg";
import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";
// import AnimatedCounter from "@/components/AnimatedCounter";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroStadium}
          alt="Football stadium at night"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        <div className="absolute inset-0 pitch-lines opacity-30" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex text-green-700 font-bold items-center bg-green-300 gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 font-display text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" />
            Season 2025/26 Live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 max-w-4xl font-display text-white text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl"
        >
          Predict.{" "}
          <span className="text-gradient">Compete.</span>{" "}
          <span className="text-gradient-gold">Dominate.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-10 max-w-xl text-gray-50 font-body text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          The ultimate football prediction platform. Pick your winners, 
          climb the leaderboard, and prove you know the beautiful game.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-14 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-display text-base font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:brightness-110"
          >
            <Button className="flex gap-4 items-center" onClick={() => navigate('/login')}> 
            Start Predicting
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.button>

          <a
              href={`#${"How It Works".toLowerCase().replace(/ /g, "-")}`}
          >
          <Button color="outline" >
            See How It Works
          </Button>
          </a>
        </motion.div>

        {/* Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="grid grid-cols-3 gap-8 md:gap-16"
        > */}
          
            {/* <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-foreground md:text-4xl">
              </div>
              <div className="mt-1 font-body text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </div>
            </div> */}
        {/* </motion.div> */}

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default HeroSection;
