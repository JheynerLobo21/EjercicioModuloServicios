import * as React from 'react';
import { ServicioPadre, ServicioHijo, ServicioContext } from '../types/services';
import { serviceReducer } from '../Reducers/serviceReducer';

export const ServiciosContext = React.createContext<ServicioContext | null>(null);

export const ServiciosProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [serviciosPadres, dispatch] = React.useReducer(serviceReducer, []);

  const saveService = (service: ServicioPadre | ServicioHijo, parentId: number | null) => {
    dispatch({ type: 'ADD_SERVICE', payload: { service, parentId } });
  };

  const updateService = (service: ServicioPadre | ServicioHijo, parentId: number | null) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: { service, parentId } });
  };

  const deleteService = (id: number, level: number, parentId: number | null) => {
    dispatch({ type: 'DELETE_SERVICE', payload: { id, level, parentId } });
  };

  return (
    <ServiciosContext.Provider value={{ serviciosPadres, saveService, updateService, deleteService }}>
      {children}
    </ServiciosContext.Provider>
  );
};
