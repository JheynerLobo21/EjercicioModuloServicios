import { ServicioPadre, ServicioContext } from '../types/services';
import * as XLSX from 'xlsx';

export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  saveService: ServicioContext['saveService'],
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target?.result as string;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    try {
      if (fileExtension === 'csv') {
        const newServicios = parseCsv(content);
        processServices(newServicios, saveService);
      } else {
        const newServicios: ServicioPadre[] = JSON.parse(content);
        processServices(newServicios, saveService);
      }

      setOpen(false);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
    }
  };
  reader.readAsText(file);
};

const parseCsv = (csvData: string): ServicioPadre[] => {
  const lines = csvData.split('\n').filter(Boolean);
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    const servicioPadre: ServicioPadre = {
      id: parseInt(values[headers.indexOf('id')]),
      name: values[headers.indexOf('name')],
      description: values[headers.indexOf('description')],
      level: parseInt(values[headers.indexOf('level')]),
      serviciosHijo: JSON.parse(values[headers.indexOf('serviciosHijo')] || '[]')
    };
    return servicioPadre;
  });
};

const processServices = (
  serviciosPadres: ServicioPadre[],
  saveService: ServicioContext['saveService']
) => {
  serviciosPadres.forEach(servicioPadre => {
    if (saveService) {
      saveService(servicioPadre);

      if (servicioPadre.serviciosHijo && servicioPadre.serviciosHijo.length > 0) {
        console.log(servicioPadre.serviciosHijo)
        servicioPadre.serviciosHijo.forEach(servicioHijo => {
          saveService(servicioHijo, servicioPadre.id);
        });
      }
    }
  });
};

export const handleChangeExcel = (
  setModeExport: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setModeExport("excel");
  document.getElementById("exportFileExcel")?.classList.add("selected");
  document.getElementById("exportFileCsv")?.classList.remove("selected");
};

export const handleChangeCsv = (
  setModeExport: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setModeExport("csv");
  document.getElementById("exportFileCsv")?.classList.add("selected");
  document.getElementById("exportFileExcel")?.classList.remove("selected");
};

export const handleExportToCsv = (serviciosPadres: ServicioPadre[] | undefined | null) => {
  if (!serviciosPadres || serviciosPadres.length === 0) {
    console.error('No hay serviciosPadres disponibles para exportar.');
    return;
  }

  const csvContent = [
    ["id", "name", "description", "level", "serviciosHijo"],
    ...serviciosPadres.flatMap((servicio: ServicioPadre) => {
      return [
        [
          servicio.id,
          servicio.name,
          servicio.description,
          servicio.level,
          JSON.stringify(servicio.serviciosHijo || [])
        ]
      ];
    })
  ];

  const csvString = csvContent.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "servicios.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const handleExportToExcel = (serviciosPadres: ServicioPadre[] | undefined | null) => {
  if (!serviciosPadres || serviciosPadres.length === 0) {
    console.error('No hay serviciosPadres disponibles para exportar.');
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(serviciosPadres);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Servicios");
  XLSX.writeFile(workbook, "servicios.xlsx");
};
