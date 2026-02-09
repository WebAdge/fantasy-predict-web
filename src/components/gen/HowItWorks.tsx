import { motion } from "framer-motion";
import { Target, BarChart3, Trophy } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Predict",
    description: "Pick your winners for upcoming football matches. Score points for correct predictions.",
  },
  {
    icon: BarChart3,
    title: "Compete",
    description: "Join competitions and climb the leaderboard. Challenge friends and rivals.",
  },
  {
    icon: Trophy,
    title: "Win",
    description: "Top the rankings and prove you're the ultimate football oracle.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Three Steps to <span className="text-gradient">Glory</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group glass-card glow-border relative rounded-2xl p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <step.icon className="h-7 w-7" />
              </div>
              <div className="mb-2 font-display text-sm font-semibold text-primary">
                Step {i + 1}
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
