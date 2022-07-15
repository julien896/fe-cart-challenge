import React, { useEffect } from 'react'
import { api } from '../utils/api';
import { useDispatch, useStore } from "../store/CarritoProvider";
import { types } from "../store/carritoReducer";
import Card from './base/Card/Card';

export const ListadoProductosComponent = () => {
  const dispatch = useDispatch();
  const { cart, gems, items } = useStore();

  const fetchData = async() => {
      api
      .get('/productos')
      .then(res => dispatch({ type: types.getItems, payload: res.data }))
      .catch(err => console.error(err))
    }
  
  useEffect(() => {
    if(items.length) return;
    fetchData()
  }, [])

  const buttonDisabled = (category: string, price: number) => 
      cart.some((el: any) => el.categoria === category) || 
      gems === 0 ||
      gems < price

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {items?.map((el: any) => (
          <Card 
            key={el?.id}
            title={el?.nombre}
            text={el?.descripcion}
            image={el?.imagen}
            price={el?.precio}
            event={() => { 
              dispatch({ type: types.addItem, payload: el }) 
              dispatch({ type: types.quitGems, payload: el.precio})
            }}
            disabled={buttonDisabled(el?.categoria, el?.precio)}
          />
        ))}
      </div>
    </div>
  );
};
