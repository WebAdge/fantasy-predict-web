import { motion } from "framer-motion";
import { Trophy, Users, TrendingUp } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 text-white"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Trophy className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Fantasy<span className="text-primary">Predict</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {["Competitions", "Leaderboard", "How It Works"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
            Log In
          </button>
          <button className="rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)] hover:brightness-110">
            Sign Up
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
