"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Eye, EyeOff, Info } from "lucide-react"

export default function AccountPage() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <nav className="p-4 space-y-1">
          <Link
            href="/admin/settings/basic"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Basic</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/admin/settings/account"
            className="flex items-center justify-between px-4 py-3 text-white bg-emerald-500 rounded-lg"
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5" />
          </Link>

          <Link
            href="/admin/settings/notifications"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Notificaitions</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-medium">Password</h1>
            <Info className="h-5 w-5 text-gray-400 ml-2" />
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">
                Old Password
              </label>
              <div className="relative">
                <input
                  id="old-password"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Input your old password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Input your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Min 8 Characters with a combination of letters and numbers</p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmation New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirmation your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
