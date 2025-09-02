import { Link } from '@tanstack/react-router'
import { Rocket } from 'lucide-react'

import UserStatus from './components/UserStatus'

export default function Header() {
  return (
    <header className="border-primary/20 relative border-b bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-4 py-3 sm:px-6 sm:py-4">
      <div className="absolute inset-0 opacity-30">
        <div className="relative h-full w-full">
          <div className="from-primary via-accent absolute top-0 left-0 h-full w-1 bg-gradient-to-b to-transparent"></div>
          <div className="via-accent to-primary absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent"></div>
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 transition-all duration-300 sm:gap-3"
        >
          <div className="relative">
            <Rocket className="text-primary group-hover:text-accent h-6 w-6 transition-colors duration-300 sm:h-8 sm:w-8" />
            <div className="bg-primary/20 group-hover:bg-accent/20 absolute inset-0 blur-md transition-all duration-300"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="group-hover:text-accent text-lg font-bold text-white transition-colors duration-300 sm:text-xl">
              Starship Battles
            </h1>
            <span className="xs:block hidden text-[10px] tracking-wide text-gray-400 uppercase sm:text-xs">
              Command Center
            </span>
          </div>
        </Link>

        <UserStatus />
      </div>
    </header>
  )
}
