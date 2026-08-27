import Link from "next/link";
import {
  GlobeAltIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "Events", href: "#" },
  { label: "Shop", href: "/products" },
  { label: "Site Map", href: "#" },
  { label: "Blog", href: "#" },
];

const policies = ["Privacy Policy", "Terms of Service", "Return Policy"];

// Inline SVG brand icons — no extra package needed
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.736-8.84L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialLinks = [
  { title: "Facebook",  icon: FacebookIcon,  href: "#", hoverBg: "hover:bg-[#1877F2]" },
  { title: "Instagram", icon: InstagramIcon, href: "#", hoverBg: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]" },
  { title: "X / Twitter", icon: XIcon,       href: "#", hoverBg: "hover:bg-[#000000]" },
  { title: "LinkedIn",  icon: LinkedInIcon,  href: "#", hoverBg: "hover:bg-[#0A66C2]" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div>
            <p
              className="text-3xl text-[#F5C842] mb-3"
              style={{ fontFamily: "var(--font-pacifico)" }}
            >
              Diya&apos;s Shop
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-4">
              Diya&apos;s Shop is your one-stop festive destination for
              everything Diwali — diyas, rangoli, sweets, lanterns and more,
              delivered right to your door.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <EnvelopeIcon className="w-4 h-4 shrink-0" />
              <span>hello@diyasshop.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5C842] font-semibold text-xs uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#F5C842] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Policies */}
          <div>
            <h4 className="text-[#F5C842] font-semibold text-xs uppercase tracking-widest mb-4">
              Follow Us
            </h4>

            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  aria-label={s.title}
                  title={s.title}
                  className={`w-9 h-9 rounded-full bg-white/10 ${s.hoverBg} flex items-center justify-center text-white/70 hover:text-white transition-all duration-200`}
                >
                  <s.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <GlobeAltIcon className="w-4 h-4 shrink-0" />
              <span>www.diyasshop.in</span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {policies.map((t) => (
                <Link
                  key={t}
                  href="#"
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 pt-6">
          Copyright &copy; 2025 Diya&apos;s Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
