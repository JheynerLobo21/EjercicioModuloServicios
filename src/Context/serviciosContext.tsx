import * as React from 'react';
import { ServicioPadre, ServicioContextPadre, ServicioHijo } from '../types/services';
import { serviceReducer } from '../Reducers/serviceReducer';

export const ServiciosContext = React.createContext<ServicioContextPadre | null>(null);

export const ServicioPadreProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [serviciosPadres, dispatch] = React.useReducer(serviceReducer, []);

  const saveService = (padre: ServicioPadre) => {
    dispatch({ type: 'ADD_SERVICE', payload: padre });
  };

  const updateService = (padre: ServicioPadre) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: padre });
  };

  const deleteService = (id: number) => {
    dispatch({ type: 'DELETE_SERVICE', payload: id });
  };

  const addChildService = (parentId: number, child: ServicioHijo) => {
    dispatch({ type: 'ADD_CHILD_SERVICE', payload: { parentId, child } });
  };

  const updateChildService = (child: ServicioHijo) => {
    dispatch({ type: 'UPDATE_CHILD_SERVICE', payload: { parentId: parentId, child } });
  };
  

  return (
    <ServiciosContext.Provider value={{ serviciosPadres, saveService, updateService, deleteService, addChildService, updateChildService }}>
      {children}
    </ServiciosContext.Provider>
  );
};

