import React from 'react'
import { PageProps } from '../utils/types';
import { useStore } from "../store/CarritoProvider";

export const HeaderComponent: React.FC<PageProps> = ({ setShowCarrito }) => {
  const {cart, gems} = useStore();

  return (
    <div className="bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10">
      <h1 className="text-white text-2xl font-bold">🧙‍♂️ Potion Shop</h1>
      <div className="flex gap-2 items-center">
        <img src="./gem.png" alt="" />
        <span>{gems} Gemas</span>
      </div>
      <button onClick={() => setShowCarrito(true)} className="text-white hover:underline">
        Ver Carrito ({cart.length})
      </button>
    </div>
  );
};
