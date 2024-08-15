import { ServicioPadre, ServicioHijo } from '../types/services';

type Action =
  | { type: 'ADD_SERVICE'; payload: { service: ServicioPadre | ServicioHijo; parentId: number | null } }
  | { type: 'UPDATE_SERVICE'; payload: { service: ServicioPadre | ServicioHijo; parentId: number | null } }
  | { type: 'DELETE_SERVICE'; payload: { id: number; level: number; parentId: number | null } };

export const serviceReducer = (state: ServicioPadre[], action: Action): ServicioPadre[] => {
  switch (action.type) {
    case 'ADD_SERVICE': {
      const { service, parentId } = action.payload;
      if (service.level === 1) {
        return [...state, { ...service, id: Math.round(Math.random()*100), serviciosHijo: [] }];
      } else if (service.level === 2 && parentId !== null) {
        return state.map(padre =>
          padre.id === parentId
            ? {
                ...padre,
                serviciosHijo: padre.serviciosHijo
                  ? [...padre.serviciosHijo, { ...service, id: Math.round(Math.random()*100) }]
                  : [{ ...service, id: Math.round(Math.random()*100) }],
              }
            : padre
        );
      }
      return state;
    }

    case 'UPDATE_SERVICE': {
      const { service: updatedService, parentId: updateParentId } = action.payload;
      if (updatedService.level === 1) {
        return state.map(padre =>
          padre.id === updatedService.id
            ? { ...padre, ...updatedService }
            : padre
        );
      } else if (updatedService.level === 2 && updateParentId !== null) {
        return state.map(padre =>
          padre.id === updateParentId
            ? {
                ...padre,
                serviciosHijo: padre.serviciosHijo?.map(hijo =>
                  hijo.id === updatedService.id
                    ? { ...hijo, ...updatedService }
                    : hijo
                ) || [],
              }
            : padre
        );
      }
      return state;
    }

    case 'DELETE_SERVICE': {
      const { id, level, parentId: deleteParentId } = action.payload;
      if (level === 1) {
        return state.filter(padre => padre.id !== id);
      } else if (level === 2 && deleteParentId !== null) {
        return state.map(padre =>
          padre.id === deleteParentId
            ? {
                ...padre,
                serviciosHijo: padre.serviciosHijo?.filter(hijo => hijo.id !== id) || [],
              }
            : padre
        );
      }
      return state;
    }

    default:
      return state;
  }
};
