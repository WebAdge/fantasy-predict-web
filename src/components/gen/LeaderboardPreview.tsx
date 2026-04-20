import { motion } from "framer-motion";
import { Crown, Medal, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const players = [
  { rank: 1, name: "Marcus_W", points: 2847, icon: Crown, change: "+12" },
  { rank: 2, name: "GoalKing99", points: 2791, icon: Medal, change: "+8" },
  { rank: 3, name: "PitchMaster", points: 2756, icon: Award, change: "+15" },
  { rank: 4, name: "TacticianX", points: 2701, icon: null, change: "+5" },
  { rank: 5, name: "MatchDay_Pro", points: 2688, icon: null, change: "+10" },
];

const rankColors: Record<number, string> = {
  1: "text-accent",
  2: "text-muted-foreground",
  3: "text-primary",
};

const LeaderboardPreview = () => {
    const navigate = useNavigate();
  return (
    <section id="leaderboard" className="relative py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-widest text-primary">
              Leaderboard
            </span>
            <h2 className="mb-5 font-display text-4xl font-bold text-foreground md:text-5xl">
              Climb the <span className="text-gradient">Rankings</span>
            </h2>
            <p className="mb-8 max-w-md font-body text-lg leading-relaxed text-muted-foreground">
              Every correct prediction earns points. Rise through the ranks, 
              track your performance over the season, and prove you know football 
              better than anyone.
            </p>
            <button className="rounded-lg bg-primary px-7 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)] hover:brightness-110"
            onClick={() => navigate('/leaderboard')}
            >
              View Full Leaderboard
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden rounded-2xl"
          >
            <div className="border-b border-border/50 px-6 py-4">
              <h3 className="font-display text-sm font-semibold text-muted-foreground">
                TOP PREDICTORS — THIS WEEK
              </h3>
            </div>
            <div className="divide-y divide-border/30">
              {players.map((player, i) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-secondary/30"
                >
                  <span
                    className={`font-display text-lg font-bold ${
                      rankColors[player.rank] || "text-muted-foreground"
                    }`}
                  >
                    #{player.rank}
                  </span>
                  {player.icon && (
                    <player.icon
                      className={`h-5 w-5 ${rankColors[player.rank] || "text-muted-foreground"}`}
                    />
                  )}
                  <span className="flex-1 font-display font-semibold text-foreground">
                    {player.name}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {player.change}
                  </span>
                  <span className="font-display text-sm font-bold text-foreground">
                    {player.points.toLocaleString()} pts
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
