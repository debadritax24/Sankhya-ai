import Link from "next/link";

const footerLinks = {
  platform: [
    { name: "About SANKHYA AI", href: "/about" },
    { name: "How It Works", href: "/about#how-it-works" },
    { name: "Key Capabilities", href: "/about#capabilities" },
    { name: "Competency Domains", href: "/about#domains" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api/docs" },
    { name: "Research Papers", href: "/resources" },
    { name: "Training Materials", href: "/learning" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Report Issue", href: "/report" },
    { name: "Feedback", href: "/feedback" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Accessibility Statement", href: "/accessibility" },
    { name: "Data Protection", href: "/data-protection" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Platform links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Government identity */}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-text-inverse font-bold text-sm">
                SA
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  SANKHYA AI
                </div>
                <div className="text-xs text-gray-500">
                  Prototype for Official Statistics Capacity Building
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} SANKHYA AI. An SIH 2026 prototype.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Problem Statement 26101 — AI-enabled Skill Intelligence Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
