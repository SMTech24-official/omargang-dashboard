import React from "react";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "lucide-react";

const customersData = [
  {
    name: "James Kiler",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
  {
    name: "Md Sujon",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
  {
    name: "Brennan",
    email: "jameskiler@gmail.com",
    phone: "+6223456789",
    orderId: "BIT-001",
    image: "",
  },
];

const CustomerTable = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Top Customers</h2>
      <div className="bg-white rounded-md shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Phone Number
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customersData.map((customer) => (
              <tr key={customer.name}>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={customer.image}
                        alt={customer.name}
                        width={40}
                        height={40}
                        className="object-cover bg-[#F9F7F9]"
                      />
                    </div>
                    <div className="ml-2">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {customer.orderId}
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-start gap-2">
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerTable;
