import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 py-20">
      <div className="absolute inset-0 hero-glow opacity-30" />
      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Ready to Prove Your{" "}
            <span className="text-gradient">Football IQ?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-body text-lg text-muted-foreground">
            Join thousands of fans making predictions. It's free, it's fun, and
            glory awaits.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="animate-pulse-glow rounded-xl bg-primary px-10 py-4 font-display text-lg font-bold text-primary-foreground transition-all hover:brightness-110"
          >
            Get Started — It's Free
          </motion.button>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border/20 pt-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold text-foreground">
              Fantasy<span className="text-primary">Predict</span>
            </span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © 2026 Fantasy Predict. Predict. Compete. Dominate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
