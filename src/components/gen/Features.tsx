import { motion } from "framer-motion";
import { Zap, Shield, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Live Predictions",
    description: "Make predictions right up to kickoff. Real-time updates as matches unfold.",
  },
  {
    icon: Shield,
    title: "Multiple Leagues",
    description: "Premier League, Champions League, World Cup qualifiers and more.",
  },
  {
    icon: Users,
    title: "Private Pools",
    description: "Create private competitions with friends, colleagues, or your community.",
  },
  {
    icon: Globe,
    title: "Global Rankings",
    description: "Compete against thousands of predictors worldwide for ultimate bragging rights.",
  },
];

const Features = () => {
  return (
    <section id="competitions" className="relative py-28">
      <div className="absolute inset-0 pitch-lines opacity-50" />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest text-accent">
            Features
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Everything You Need to{" "}
            <span className="text-gradient-gold">Dominate</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group glass-card flex items-start gap-5 rounded-2xl p-7"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
