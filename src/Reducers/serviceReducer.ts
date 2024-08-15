import { ServicioPadre, ServicioHijo } from '../types/services';

type Action =
  | { type: 'ADD_SERVICE'; payload: ServicioPadre }
  | { type: 'UPDATE_SERVICE'; payload: ServicioPadre }
  | { type: 'DELETE_SERVICE'; payload: number }
  | { type: 'ADD_CHILD_SERVICE'; payload: { parentId: string; child: ServicioHijo } }
  | { type: 'UPDATE_CHILD_SERVICE'; payload: { parentId: string; child: ServicioHijo } }
  | { type: 'DELETE_CHILD_SERVICE'; payload: { parentId: string; childId: number } };

export const serviceReducer = (state: ServicioPadre[], action: Action): ServicioPadre[] => {
  switch (action.type) {
    case 'ADD_SERVICE':
      return [...state, { ...action.payload, id: Math.random().toString() }];

    case 'UPDATE_SERVICE':
      return state.map(padre =>
        padre.id === action.payload.id
          ? { ...padre, name: action.payload.name, description: action.payload.description }
          : padre
      );

    case 'DELETE_SERVICE':
      return state.filter(padre => padre.id !== action.payload);

    case 'ADD_CHILD_SERVICE':
      return state.map(padre =>
        padre.id === action.payload.parentId
          ? { 
              ...padre, 
              serviciosHijo: padre.serviciosHijo 
                ? [...padre.serviciosHijo, action.payload.child] 
                : [action.payload.child] 
            }
          : padre
      );

    case 'UPDATE_CHILD_SERVICE':
      return state.map(padre =>
        padre.id === action.payload.parentId
          ? {
              ...padre,
              serviciosHijo: padre.serviciosHijo?.map(hijo =>
                hijo.id === action.payload.child.id
                  ? { ...hijo, name: action.payload.child.name, description: action.payload.child.description }
                  : hijo
              ) || [],
            }
          : padre
      );
    
    case 'DELETE_CHILD_SERVICE':
      return state.map(padre =>
        padre.id === action.payload.parentId
          ? {
              ...padre,
              serviciosHijo: padre.serviciosHijo?.filter(hijo => hijo.id !== action.payload.childId) || [],
            }
          : padre
      );

    default:
      return state;
  }
};
