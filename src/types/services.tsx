export interface ServicioPadre {
    id: number;
    name: string;
    description: string;
    level: number;
    serviciosHijo: ServicioHijo[] | null;
}

export interface ServicioHijo {
    id: number;
    name: string;
    description: string;
    level: number;
    idPadre: number;
}

export interface ServicioContextPadre {
    serviciosPadres: ServicioPadre[] | null;
    saveService: (servicio: ServicioPadre) => void;
    updateService: (servicio: ServicioPadre) => void;
    deleteService: (id: number) => void;
    addChildService: (parentId: number, child: ServicioHijo) => void;
    updateChildService: (parentId: number, child: ServicioHijo) => void;
    deleteChildService: (parentId: number, childId: number) => void;
  }
  


export interface ServicioContextHijo {
    serviciosHijos: ServicioHijo[] | null;
    saveService: (servicio: ServicioHijo) => void;
    updateService: (servicio: ServicioHijo) => void;
    deleteService: (id: number) => void;
}
