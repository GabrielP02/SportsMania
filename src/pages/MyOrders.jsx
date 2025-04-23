import React from "react";
import NavBar from "../components/NavBar";

const MyOrders = () => {
  return (
    <>
    <NavBar />
    <div className="flex items-center justify-center h-[80vh] flex-col">
      <h1 className="text-2xl font-bold">Meus Pedidos</h1>
      <p className="text-lg text-gray-600">
        Aqui você pode ver todos os seus pedidos anteriores.
      </p>
    </div>
    </>
  );
};

export default MyOrders;
