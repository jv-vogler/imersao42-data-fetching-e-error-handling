import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function UserStatus() {
  const [isOnline, setIsOnline] = useState(true)

  const toggleOnline = () => {
    setIsOnline((prev) => !prev)
  }

  return (
    <div className="ml-2 flex items-center gap-1 rounded-md border border-gray-700 bg-gray-800 px-2 py-1 select-none sm:ml-0 sm:gap-2 sm:px-3">
      <div
        className={`h-2 w-2 rounded-full ${
          isOnline ? 'animate-pulse bg-green-400' : 'bg-gray-500'
        }`}
      ></div>
      <button
        className={cn(
          `cursor-pointer text-[10px] tracking-wide text-gray-300 uppercase sm:text-xs`,
          { 'cursor-default': isOnline },
        )}
        onClick={toggleOnline}
        disabled={isOnline}
      >
        {isOnline ? 'Online' : 'Offline'}
      </button>

      {isOnline && (
        <>
          <div className="mx-1 h-3 w-px bg-gray-600"></div>
          <button
            onClick={toggleOnline}
            className="flex items-center gap-1 text-gray-400 transition-colors duration-200 hover:text-red-400"
            title="Logout"
          >
            <LogOut className="h-3 w-3 cursor-pointer" />
          </button>
        </>
      )}
    </div>
  )
}
