import React, { useState } from "react";
import { PageProps } from "../utils/types";
import { api } from "../utils/api";
import { useDispatch, useStore } from "../store/CarritoProvider";
import { types } from "../store/carritoReducer";

export const CarritoComponent: React.FC<PageProps>  = ({ setShowCarrito }) => {
  const { cart } = useStore()
  const dispatch = useDispatch()

  const [purchaseCompleted, setPurchaseCompleted] = useState<boolean>(false)

  const filteredItems = (id: number) => cart.filter((el: any) => el.id !== id)
  
  function removeItem(id: number, item: Object) {
    dispatch({ type: types.removeItem, payload: filteredItems(id) })
    dispatch({ type: types.addGems, payload: item })
  }

  //Select item ids to make the request
  const itemsToBuy = () => {
    const arr: Array<number> = []
    cart.forEach((el: any) => arr.push(el.id))
    return arr
  }

  const buyProducts = () => {
    api
    .post('/compras', { itemsId: itemsToBuy() })
    .then(() => { 
      dispatch({ type : types.resetState })
      setPurchaseCompleted(true) 
    })
    .catch(err => console.error(err))
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-start">
        <button 
          onClick={() => { 
            setShowCarrito(false) 
            setPurchaseCompleted(false)
          }}
          className='rounded-md bg-indigo-600 text-white pt-1.5 pb-1.5 pl-4 pr-4 hover:bg-indigo-800'
        >
          Volver
        </button>
      </div>

      {purchaseCompleted ?
      <span className="text-lg font-semibold text-white mt-6 mb-6">Compra realizada!</span> :
      <div className="grid grid-cols-1 mt-4 mb-4">
        {cart?.map((item: any) => (
          <div 
            key={item?.id} 
            className="border-b border-b-slate-900 h-10 bg-stone-700 rounded-sm flex items-center justify-between pl-2.5 pr-2.5"
          >
            <div className="flex items-center rounded-full bg-stone-600">
              <img src={item?.imagen} alt="" />
            </div>
            <span className="flex items-center">{item?.nombre}</span>
            <button 
              className="text-stone-600 text-lg font-semibold" 
              onClick={() => removeItem(item.id, item)}
            >
              X
            </button>
          </div>
        ))}
      </div>}

      <button 
        className='rounded-md bg-indigo-600 text-white p-1.5 hover:bg-indigo-800 disabled:bg-stone-700 disabled:cursor-not-allowed' 
        onClick={() => buyProducts()}
        disabled={!cart.length}
      >
        Comprar
      </button>
    </div>
  );
};


