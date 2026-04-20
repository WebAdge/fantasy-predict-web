import { motion } from "framer-motion";
import { Target, TrendingUp, Award, XCircle } from "lucide-react";

const scoringRules = [
  {
    icon: Target,
    title: "Exact Prediction",
    description: "Nail the exact score (e.g. 2-1) and earn the maximum points.",
    points: "+3",
    color: "text-white",
    bgColor: "bg-[#ffd700]/10",
    borderColor: "border-[#ffd700]/30",
  },
  {
    icon: TrendingUp,
    title: "Close Prediction",
    description: "Get the goal difference right but not the exact score.",
    points: "+2",
    color: "text-white",
    bgColor: "bg-[#ffd700]/10",
    borderColor: "border-[#ffd700]/30",
  },
  {
    icon: Award,
    title: "Correct Outcome",
    description: "Predict the winner correctly (or a draw), but miss the score.",
    points: "+1",
    color: "text-white",
    bgColor: "bg-green-500/10",
    borderColor: "border-secondary/30",
  },
  {
    icon: XCircle,
    title: "Wrong Prediction",
    description: "Get the outcome wrong. No points, but keep going!",
    points: "0",
    color: "text-white/70",
    bgColor: "bg-white/10",
    borderColor: "border-border",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-white font-bold uppercase mb-4">
            How It <span className="text-[#ffd700]">Works</span>
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-lg font-body">
            Predict match scores before kickoff. The closer you are, the more
            points you earn. Simple.
          </p>
        </motion.div>

        {/* Scoring Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {scoringRules.map((rule) => (
            <motion.div
              key={rule.title}
              variants={item}
              className={`relative rounded-xl border ${rule.borderColor} ${rule.bgColor} p-6 text-center group hover:scale-[1.03] transition-transform`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${rule.bgColor} mb-4`}>
                <rule.icon className={`w-7 h-7 ${rule.color}`} />
              </div>
              <div className={`font-display text-3xl font-bold ${rule.color} mb-2`}>
                {rule.points}
              </div>
              <h3 className="font-display text-lg font-semibold uppercase text-white/80 mb-2">
                {rule.title}
              </h3>
              <p className="text-sm text-white/60 font-body leading-relaxed">
                {rule.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-white/70 font-body text-base"
        >
          The higher your score, the higher you rank on the leaderboard.{" "}
          <span className="text-[#ffd700] font-semibold">Predict as many matches as you can!</span>
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorks;
