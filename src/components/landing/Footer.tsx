import { Instagram, Facebook, Mail } from "lucide-react";
// import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-white/60">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">              
              <span className="font-display text-xl font-bold uppercase text-white/80">
                Fantasy Predict
              </span>
            </div>
            <p className="text-white/70 font-body text-sm leading-relaxed mb-6">
              Empowering football fans worldwide to showcase their prediction skills and win big during the World Cup 2026. Join thousands of predictors competing for glory.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                // { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "https://web.facebook.com/fantasypredictofficial", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center text-white hover:bg-primary hover:text-white/70 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["How It Works", "Prize Pool", "Leaderboard", "Make Predictions"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors font-body">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {[{name: "Terms & Conditions", link: "/terms-and-condition"}, {name: "Privacy Policy", link: "/privacy-policy"}].map((item) => (
                <li key={item.name}>
                  <a href={item.link} className="text-sm text-white/70 hover:text-primary transition-colors font-body">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Get In Touch
            </h4>
            <a
              href="mailto:support@fantasy-predict.com"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors font-body mb-4"
            >
              <Mail className="w-4 h-4" />
              support@fantasy-predict.com
            </a>
            <p className="text-xs text-white/70 font-body leading-relaxed">
              Have questions or feedback? Reach out to our team — we'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <Separator /> */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/70 font-body">
            © {currentYear} Fantasy Predict. All rights reserved. World Cup 2026 Edition.
          </p>
          <div className="flex items-center gap-4">
            {[{name: "Terms", link: "/terms-and-condition"}, {name: "Privacy", link: "/privacy-policy"}].map((item) => (
              <a key={item.name} href={item.link} className="text-xs text-white/70 hover:text-primary transition-colors font-body">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
