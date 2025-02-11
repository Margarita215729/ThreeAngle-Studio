import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()
  const isSpecialsPage = pathname === "/specials"

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        isSpecialsPage ? "bg-gradient-to-r from-[#1a0b2e] to-[#2a1b4e]/80" : "bg-[#1a1a1a]/80"
      } backdrop-blur-md`}
    >
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          <nav className="flex-1">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/portfolio"
                  className="nav-link relative px-4 py-2 group transition-transform duration-300 hover:translate-z-4"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'}">
                    Portfolio
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'} glow-effect"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="nav-link relative px-4 py-2 group transition-transform duration-300 hover:translate-z-4"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'}">
                    Services
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'} glow-effect"></span>
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset%209@33.33x-kjgz9umxgNh8cy5QjBQkgdZFRwRarU.png"
              alt="ThreeangleStudio Logo"
              width={100}
              height={33}
              className="mx-auto"
              priority
            />
          </Link>
          <nav className="flex-1 flex justify-end">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="/specials"
                  className="nav-link relative px-4 py-2 group transition-transform duration-300 hover:translate-z-4"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'}">
                    Specials
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'} glow-effect"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="nav-link relative px-4 py-2 group transition-transform duration-300 hover:translate-z-4"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'}">
                    Contact Us
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-${isSpecialsPage ? '[#ffd700]' : '[#ffccb0]'} glow-effect"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

