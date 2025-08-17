"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    { icon: "📊", label: "Dashboard", href: "/dashboard", active: pathname === "/dashboard" },
    { icon: "💰", label: "Trade", href: "/trades", active: pathname === "/trades" },
    { icon: "📈", label: "Markets", href: "/markets", active: pathname === "/markets" },
    { icon: "👤", label: "Profile", href: "/profile", active: pathname === "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              item.active ? "text-yellow-400 bg-yellow-400/10" : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
