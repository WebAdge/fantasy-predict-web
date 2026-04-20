import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-6 text-white/80">
            The <span className="text-[#ffd700]">Beautiful Game</span>, Your Predictions
          </h2>
          <p className="text-white/70 text-lg leading-relaxed font-body mb-6">
            The World Cup is the greatest tournament of the summer — in fact, of
            the entire calendar year. Nations battle for glory, players compete
            to etch their names in history, and fans around the world unite in
            passion.
          </p>
          <p className="text-white/70 text-lg leading-relaxed font-body">
            <span className="text-[#ffd700] font-semibold">Fantasy Predict</span>{" "}
            gives you the chance to prove your football knowledge. Predict
            matches, outscore your rivals, and climb to the top of the
            leaderboard. The best predictor doesn't just win bragging rights —
            they win <span className="text-[#ffd700] font-semibold">big</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
