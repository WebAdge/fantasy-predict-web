import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo-icon.png';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card bg-black border-b border-border/50 text-white"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-primary">
            <img src={Logo} className="h-[50px] w-[50px] rounded-full" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Fantasy<span className="text-primary">{" "}Predict</span>
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
          <button 
          onClick={() => navigate('/login')}
          className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
            Log In
          </button>
          <button
          onClick={() => navigate('/create-account')}
           className="rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)] hover:brightness-110">
            Sign Up
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
