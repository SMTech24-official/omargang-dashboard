import Image from "next/image";
import React from "react";

const OrderList = () => {
  const orderListData = [
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
    {
      id: "12345",
      productName: "chicken thigh",
      serving: 1,
      productImage: "",
    },
  ];

  return (
    <>
      <p className="text-[#3F3D56] font-bold mb-4">Order List</p>
      {orderListData.map((order) => (
        <div className="flex justify-between mb-4 items-center" key={order.id}>
          <div className="flex items-center gap-4">
            <Image
              className="bg-[#F9F7F9] rounded-md p-2 object-cover h-10 w-10"
              alt="productimage"
              src={order.productImage}
            />
            <div>
              <p>{order.productName}</p>
              <p>{order.serving} serving</p>
            </div>
          </div>
          <button className="bg-[#63B883] p-2 rounded-md text-white">
            Pending
          </button>
        </div>
      ))}
    </>
  );
};

export default OrderList;
