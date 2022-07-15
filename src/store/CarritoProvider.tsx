import React, { createContext, useContext, useReducer } from 'react'
import { ProviderProps } from '../utils/types';
import carritoReducer, { initialState } from './carritoReducer';

const CarritoContext = createContext<Array<any>>([]);

const CarritoProvider: React.FC<ProviderProps> = ({ children }) =>
        <CarritoContext.Provider value={useReducer(carritoReducer, initialState)}>
            {children}
        </CarritoContext.Provider>

const useStore = () => useContext(CarritoContext)[0]
const useDispatch = () => useContext(CarritoContext)[1]

export { CarritoContext, useStore, useDispatch }
export default CarritoProvider;