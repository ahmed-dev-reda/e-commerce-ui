import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="container mx-auto w-full bg-[#1e293b] text-gray-300 rounded-xl p-8 md:p-12 mb-4">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Copyright Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {/* يمكنك استبدال الصورة بمصار الشعار لديك */}
            <div className="relative w-8 h-8">
              <span className="text-2xl">
                <Image src={"/logo.png"} alt="" width={30} height={30} />
              </span>
            </div>
            <span className="text-white font-bold text-xl tracking-wide uppercase">
              TRENDLAMA.
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">© 2025 Trendlama.</p>
          <p className="text-sm text-gray-400">All rights reserved.</p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Links</h3>
          <Link href="/" className="hover:text-white transition text-sm">
            Homepage
          </Link>
          <Link href="/contact" className="hover:text-white transition text-sm">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-white transition text-sm">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-white transition text-sm">
            Privacy Policy
          </Link>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Links</h3>
          <Link
            href="/products"
            className="hover:text-white transition text-sm"
          >
            All Products
          </Link>
          <Link
            href="/new-arrivals"
            className="hover:text-white transition text-sm"
          >
            New Arrivals
          </Link>
          <Link
            href="/best-sellers"
            className="hover:text-white transition text-sm"
          >
            Best Sellers
          </Link>
          <Link href="/sale" className="hover:text-white transition text-sm">
            Sale
          </Link>
        </div>

        {/* Links Column 3 */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold mb-1">Links</h3>
          <Link href="/about" className="hover:text-white transition text-sm">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition text-sm">
            Contact
          </Link>
          <Link href="/blog" className="hover:text-white transition text-sm">
            Blog
          </Link>
          <Link
            href="/affiliate"
            className="hover:text-white transition text-sm"
          >
            Affiliate Program
          </Link>
        </div>
      </div>
    </footer>
  );
}
