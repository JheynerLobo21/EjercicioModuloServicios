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

export interface ServicioContext {
    serviciosPadres?: ServicioPadre[] | null;
    saveService?: (servicio: ServicioPadre | ServicioHijo, id?: number | null) => void;
    updateService?: (servicio: ServicioPadre | ServicioHijo, id?: number | null) => void;
    deleteService?: (id: number, level:number, idPadre: number) => void;
  }