import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-transparent text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">YT to MP3</h1>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-yellow-400 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/features"
              className="hover:text-yellow-400 transition duration-200"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/faqs"
              className="hover:text-yellow-400 transition duration-200"
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-yellow-400 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
