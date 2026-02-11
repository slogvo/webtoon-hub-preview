import Link from "next/link";
import Image from "next/image";

const products = [
  { name: 'Contaq', path: '/contaq' },
  { name: 'Movie Scan', path: '/movie-scan' },
  { name: 'Film Restoration', path: '/film-restoration' },
  { name: 'Movie Dubie Studio', path: '/movie-dubie-studio' },
  { name: 'Vocast', path: '/voice-talents' },
  { name: 'Legita', path: '/legita' },
];

const companyLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Terms of Use', path: '/terms-of-uses' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 py-16 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
          {/* Brand & Mission */}
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="flex items-center gap-3" aria-label="4HumAI - Home">
              <Image
                src="/horizontal-logo.svg"
                alt="4HumAI Logo"
                width={129}
                height={44}
                className="h-11 rounded-xl invert dark:invert-0"
              />
            </Link>
            <p className="max-w-md text-base leading-relaxed text-black/60 dark:text-white/60">
              Empowering humanity through ethical artificial intelligence. We build tools that enhance human potential and protect creativity.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/ai-for-humanity-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-black/10 p-2.5 text-black/50 transition-all hover:border-black/30 hover:text-black dark:border-white/10 dark:text-white/50 dark:hover:border-white/30 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-black uppercase dark:text-white">
              Tools
            </h3>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.path}>
                  <Link
                    href={product.path}
                    className="text-base text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-wider text-black uppercase dark:text-white">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-base text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ethical Promise */}
        <div className="mt-16 border-t border-black/5 pt-12 dark:border-white/5">
          <div className="rounded-3xl bg-black/2 p-8 text-center dark:bg-white/2">
            <h4 className="mb-3 text-lg font-medium text-black dark:text-white">
              Our Ethical AI Promise
            </h4>
            <p className="mx-auto max-w-2xl text-base text-black/60 dark:text-white/60">
              At <span className="font-semibold text-black dark:text-white">4hum.ai</span>, we promise to never use your data to train models without explicit consent and to always prioritize human well-being above profit.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-black/5 pt-8 text-sm text-black/60 md:flex-row dark:border-white/5 dark:text-white/60">
          <div className="text-center md:text-left">
            <p>2 Nguyen Thanh Son, Thu Duc City, Ho Chi Minh City, Vietnam</p>
            <p className="mt-1">
              Email: <a href="mailto:hello@4hum.ai" className="transition-colors hover:text-black dark:hover:text-white">hello@4hum.ai</a>
            </p>
          </div>
          <div className="text-center md:text-right">
            © 2026 4HumAI Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
