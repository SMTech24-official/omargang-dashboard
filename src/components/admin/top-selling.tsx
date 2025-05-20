import Image from "next/image";

export default function TopSellingTable(topSelingData: any) {
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
          {topSelingData?.topSelingData?.result?.map((product: any) => (
            <tr key={product.foodId} className="border-b">
              <td className="py-3 text-sm">{product.foodId}</td>
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
              <td className="py-3 text-sm">{product.foodType}</td>
              <td className="py-3 text-sm">{product.sells}</td>
              <td className="py-3 text-sm">{product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
