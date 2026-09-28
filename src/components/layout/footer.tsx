import Image from "next/image";

const linkColumns = [
  ["Homepage", "Contact", "Terms of Service", "Privacy Policy"],
  ["All Products", "New Arrivals", "Best Sellers", "Sale"],
  ["About", "Contact", "Blog", "Affiliate Program"],
];

export default function Footer() {
  return (
    <footer className="container mx-auto w-full bg-[#1e293b] text-gray-300 rounded-xl p-8 md:p-12 mb-4">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Copyright Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="Trendlama" width={30} height={30} />
            </div>

            <span className="text-white font-bold text-xl tracking-wide uppercase">
              TRENDLAMA.
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} Trendlama.
          </p>

          <p className="text-sm text-gray-400">
            All rights reserved to{" "}
            <a
              href="https://github.com/ahmed-dev-reda"
              className="text-blue-700 text-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ahmed Reda
            </a>
            .
          </p>
        </div>

        {/* Links */}
        {linkColumns.map((links, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-1">Links</h3>

            {links.map((link) => (
              <button
                key={link}
                type="button"
                className="text-left hover:text-white transition text-sm cursor-pointer"
              >
                {link}
              </button>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
