"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Info } from "lucide-react"

export default function NotificationsPage() {
  const [productUpdates, setProductUpdates] = useState(true)
  const [comments, setComments] = useState(false)
  const [checkoutProduct, setCheckoutProduct] = useState(true)

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
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/admin/settings/notifications"
            className="flex items-center justify-between px-4 py-3 text-white bg-emerald-500 rounded-lg"
          >
            <span>Notification</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-md">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-medium">Notification</h1>
            <Info className="h-5 w-5 text-gray-400 ml-2" />
          </div>

          <form className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">Product updates</span>
                <Info className="h-4 w-4 text-gray-400 ml-2" />
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={productUpdates}
                  onChange={() => setProductUpdates(!productUpdates)}
                />
                <div
                  className={`w-11 h-6 rounded-full peer ${
                    productUpdates ? "bg-emerald-500" : "bg-gray-200"
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">Comments</span>
                <Info className="h-4 w-4 text-gray-400 ml-2" />
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={comments}
                  onChange={() => setComments(!comments)}
                />
                <div
                  className={`w-11 h-6 rounded-full peer ${
                    comments ? "bg-emerald-500" : "bg-gray-200"
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                ></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700">Checkout Product</span>
                <Info className="h-4 w-4 text-gray-400 ml-2" />
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={checkoutProduct}
                  onChange={() => setCheckoutProduct(!checkoutProduct)}
                />
                <div
                  className={`w-11 h-6 rounded-full peer ${
                    checkoutProduct ? "bg-emerald-500" : "bg-gray-200"
                  } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                ></div>
              </label>
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
