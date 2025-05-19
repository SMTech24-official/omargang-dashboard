import Image from "next/image"

export default function TopSellingTable() {
  const products = [
    {
      id: "APR12987",
      name: "Vegetarian Noodle",
      category: "Noodles",
      sells: 4863,
      revenue: "$47,500",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "SHO8765",
      name: "Pizza Hut Luminu",
      category: "Pizza",
      sells: 1124,
      revenue: "$12,650",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "TSH9987",
      name: "Mozzarella Cheese",
      category: "Berger",
      sells: 1675,
      revenue: "$13,540",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm text-gray-500">
            <th className="pb-2 font-medium">Product ID</th>
            <th className="pb-2 font-medium">Food Name</th>
            <th className="pb-2 font-medium">Category</th>
            <th className="pb-2 font-medium">Sells</th>
            <th className="pb-2 font-medium">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-3 text-sm">{product.id}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden rounded-md border">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
              </td>
              <td className="py-3 text-sm">{product.category}</td>
              <td className="py-3 text-sm">{product.sells}</td>
              <td className="py-3 text-sm">{product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
