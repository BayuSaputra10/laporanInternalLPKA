"use client";
import Link from "next/link"
import { Menu, X, Zap, Truck, Home, FileText } from "lucide-react"
import { useState } from "react"
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b-2 border-lpka-primary/20 shadow-lg sticky top-0 z-50 supports-[backdrop-filter:blur()]:bg-white/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/lpka2.png" alt="LPKA Logo" className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform duration-300" />
            <span className="font-heading text-xl md:text-2xl font-bold bg-gradient-to-r from-lpka-primary to-lpka-green bg-clip-text text-transparent">
              LPKA Sistem
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-4 py-2 rounded-xl font-semibold text-lpka-primary hover:bg-lpka-primary/10 hover:shadow-md transition-all duration-300 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/reports/genset" className="px-4 py-2 rounded-xl font-semibold text-lpka-green hover:bg-lpka-green/10 hover:shadow-md transition-all duration-300 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Genset
            </Link>
            <Link href="/reports/vehicle" className="px-4 py-2 rounded-xl font-semibold text-lpka-primary hover:bg-lpka-primary/10 hover:shadow-md transition-all duration-300 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Kendaraan
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all duration-300 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Tentang
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-100 pt-4">
            <Link href="/" className="block px-4 py-3 rounded-xl font-semibold text-lpka-primary hover:bg-lpka-primary/10 transition-all flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <Home className="w-6 h-6 flex-shrink-0" /> Dashboard
            </Link>
            <Link href="/reports/genset" className="block px-4 py-3 rounded-xl font-semibold text-lpka-green hover:bg-lpka-green/10 transition-all flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <Zap className="w-6 h-6 flex-shrink-0" /> Genset
            </Link>
            <Link href="/reports/vehicle" className="block px-4 py-3 rounded-xl font-semibold text-lpka-primary hover:bg-lpka-primary/10 transition-all flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <Truck className="w-6 h-6 flex-shrink-0" /> Kendaraan
            </Link>
            <Link href="/about" className="block px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <FileText className="w-6 h-6 flex-shrink-0" /> Tentang
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

