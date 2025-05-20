"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Info, ChevronDown, Pencil } from 'lucide-react'

export default function Profile() {
  const [profileData, setProfileData] = useState({
    displayName: "Bryan Adams",
    email: "bryanadams@gmail.com",
    country: "India",
    city: "Delhi",
    province: "Street 01",
    bio: "I specialize in HRM role"
  })

  return (
    <div className="flex   min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64  bg-grey-50">
        <nav className="p-4 space-y-1">
          <Link
            href="/settings/basic"
            className="flex items-center justify-between px-4 py-3 text-white bg-emerald-500 rounded-lg"
          >
            <span>Basic</span>
            <ChevronRight className="h-5 w-5" />
          </Link>

          <Link
            href="/settings/account"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Account</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link
            href="/settings/notifications"
            className="flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <span>Notifications</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <div className="flex items-center mb-8">
            <h1 className="text-xl font-medium">Profile Information</h1>
            <Info className="h-5 w-5 text-gray-400 ml-2" />
          </div>

          <form className="space-y-6">
            {/* Photo Profile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Profile
              </label>
              <div className="relative inline-block">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-emerald-50">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Profile"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <button 
                  type="button" 
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                >
                  <Pencil className="h-3 w-3 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                id="display-name"
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="relative">
                  <select
                    id="country"
                    value={profileData.country}
                    onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <select
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Province */}
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <div className="relative">
                  <select
                    id="province"
                    value={profileData.province}
                    onChange={(e) => setProfileData({...profileData, province: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none"
                  >
                    <option value="Street 01">Street 01</option>
                    <option value="Street 02">Street 02</option>
                    <option value="Street 03">Street 03</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            {/* Save Button */}
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
