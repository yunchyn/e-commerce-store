"use client";

import ManageProducts from "@/components/admin/ManageProducts";
import { useState } from "react";

export default function Admin() {
  const [menu, setMenu] = useState("dashboard");

  const menus = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Orders", key: "orders" },
    { name: "Products", key: "products" },
    { name: "Customers", key: "customers" },
    { name: "Settings", key: "settings" },
  ];

  return (
    <div className="flex min-h-screen">
      {/* 메뉴뉴 */}
      <div className="w-64 bg-neutral-2 p-6">
        <h1 className="text-lg font-bold mb-6">Admin Panel</h1>
        <ul className="space-y-4">
          {menus.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => setMenu(item.key)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  menu === item.key ? "bg-neutral-5 text-white" : "text-neutral-7"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-10">
        <h2 className="text-2xl font-semibold mb-6">{menus.find((m) => m.key === menu)?.name}</h2>
        <div className="bg-neutral-1 p-6 rounded-lg shadow-md">
          {menu === "dashboard" && <p>대시보드 내용을 여기에 표시</p>}
          {menu === "orders" && <p>주문 관리 페이지</p>}
          {menu === "products" && <ManageProducts />}
          {menu === "customers" && <p>고객 관리 페이지</p>}
          {menu === "settings" && <p>설정 페이지</p>}
        </div>
      </div>
    </div>
  );
}
