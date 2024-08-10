import React from 'react'

const MenuItem = () => {
  return (
    <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900"></p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500"></p>
              </div>
            </div>
            <button
              
              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View
            </button>
          </li>
  )
}

export default MenuItem