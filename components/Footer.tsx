import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  return (
    <footer
      className={`${
        pathname === "/specials" ? "bg-gradient-to-br from-[#1a0b2e] to-[#2a1b4e]" : "bg-[#1a1a1a]"
      } text-white py-8`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            <Link
              href="https://www.instagram.com/threeanglestudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300 hover:text-${pathname === '/specials' ? '[#ffd700]' : '[#ffccb0]'}"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61566411421791"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300 hover:text-${pathname === '/specials' ? '[#ffd700]' : '[#ffccb0]'}"
            >
              <Facebook size={24} />
            </Link>
          </div>
          <div className="text-center">
            <p className={`text-${pathname === "/specials" ? "[#ffd700]" : "[#ffccb0]"}/80`}>
              &copy; {new Date().getFullYear()} ThreeangleStudio. Est. 2024
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

