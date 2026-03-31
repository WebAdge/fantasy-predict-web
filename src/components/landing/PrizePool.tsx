import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";

const prizes = [
  {
    position: "1st",
    amount: "₦200,000",
    label: "Grand Champion",
    icon: Trophy,
    gradient: "from-primary to-gold-dark",
    glow: "glow-[#ffd700]",
    scale: "lg:scale-110",
    textSize: "text-4xl md:text-4xl",
  },
  {
    position: "2nd",
    amount: "₦100,000",
    label: "Runner-Up",
    icon: Medal,
    gradient: "from-[hsl(220,10%,70%)] to-[hsl(220,10%,50%)]",
    glow: "",
    scale: "",
    textSize: "text-3xl md:text-4xl",
  },
  {
    position: "3rd",
    amount: "₦50,000",
    label: "Third Place",
    icon: Award,
    gradient: "from-[hsl(30,60%,50%)] to-[hsl(25,50%,35%)]",
    glow: "",
    scale: "",
    textSize: "text-3xl md:text-4xl",
  },
  {
    position: "4th",
    amount: "₦25,000",
    label: "Fourth Place",
    icon: Star,
    gradient: "from-secondary to-pitch-dark",
    glow: "",
    scale: "",
    textSize: "text-3xl md:text-4xl",
  },
];

const PrizePool = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#ffd700] font-display text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            World Cup 2026 Edition
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white uppercase mb-4">
            Prize <span className="text-[#ffd700]/80">Pool</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-lg font-body">
            Over <span className="text-[#ffd700] font-semibold">₦375,000</span> in
            total prizes for the top 4 predictors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto items-end">
          {prizes.map((prize, i) => (
            <motion.div
              key={prize.position}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl border border-white/60 bg-card p-8 text-center ${prize.scale} ${prize.glow} hover:scale-105 transition-transform`}
            >
              {/* Position badge */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${prize.gradient} mb-6`}>
                <prize.icon className="w-8 h-8 text-white/70" />
              </div>

              <p className="font-display text-sm font-semibold uppercase tracking-widest text-white/70 mb-1">
                {prize.position} Place
              </p>
              <p className={`font-display ${prize.textSize} font-bold text-[#ffd700] mb-2`}>
                {prize.amount}
              </p>
              <p className="text-sm text-white/70 font-body">{prize.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizePool;
