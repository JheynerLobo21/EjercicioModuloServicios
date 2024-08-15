import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Modal from '@mui/material/Modal';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { ServiciosContext } from '../../Context/serviciosContext';
import { ServicioPadre } from '../../types/services';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ImportFile() {
  const [open, setOpen] = useState(false);
  const [modeExport, setModeExport] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { serviciosPadres, saveService } = useContext(ServiciosContext) as any;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;

      try {
        const newServicios: ServicioPadre[] = JSON.parse(content);
        
        newServicios.forEach(servicio => {
          saveService(servicio);
        });
        setOpen(false);
      } catch (error) {
        console.error('Error al parsear el archivo:', error);
      }
    };
    reader.readAsText(file);
};


  const handleChangeExcel = () => {
    setModeExport("excel");
    document.getElementById("exportFileExcel")?.classList.add("selected");
    document.getElementById("exportFileCsv")?.classList.remove("selected");
  };

  const handleChangeCsv = () => {
    setModeExport("csv");
    document.getElementById("exportFileCsv")?.classList.add("selected");
    document.getElementById("exportFileExcel")?.classList.remove("selected");
  };

  const handleExportToCsv = () => {
    const csvContent = [
      ["ID", "Nombre", "Descripción", "Nivel", "Servicios Hijo"],
      ...serviciosPadres.map((servicio: ServicioPadre) => [
        servicio.id,
        servicio.name,
        servicio.description,
        servicio.level,
        servicio.serviciosHijo?.map(hijo => hijo.name).join(", ") || "N/A"
      ])
    ];

    const csvString = csvContent.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "servicios_padre.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(serviciosPadres);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Servicios Padre");
    XLSX.writeFile(workbook, "servicios_padre.xlsx");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modeExport === "csv") {
      handleExportToCsv();
    } else if (modeExport === "excel") {
      handleExportToExcel();
    }
  };

  return (
    <div>
      <div id="icons-import" style={{ position: "relative" }}>
        <Button onClick={handleOpen} style={{ color: "#595959", position: "absolute", right: "130px", bottom: "4px" }}>
          <FileOpenOutlinedIcon />
        </Button>
        <SaveOutlinedIcon style={{ position: "absolute", right: "105px", bottom: "10px" }} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span>Importar</span>
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="file-input"
              label="Seleccionar archivo"
              type="file"
              inputRef={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              id="importfile"
              onClick={handleButtonClick}>
              <label className='lbl-import' style={{ color: "#000", textTransform: "lowercase" }}>
                Seleccionar Archivo
              </label>
              <FolderOpenIcon />
            </Button>
            <span className='plantilla'>Descarga plantilla de importación de datos</span>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span style={{ marginTop: "40px" }}>Exportar</span>
          </Typography>
          <form onSubmit={handleSubmit} className='form-export'>
            <Typography id="modal-description" sx={{ mt: 2 }} component="div">
              <div id="exportFileExcel" onClick={handleChangeExcel}>
                <div>
                  <ArticleOutlinedIcon id="icon-file" />
                  <label className='lbl-export' style={{ color: "#000", textDecoration: "none" }}>
                    Plantilla.Excel
                  </label>
                </div>
                <FileDownloadOutlinedIcon />
              </div>
            </Typography>

            <Typography id="modal-description" sx={{ mt: 2 }} component="div">
              <div id="exportFileCsv" onClick={handleChangeCsv}>
                <div>
                  <ArticleOutlinedIcon id="icon-file" />
                  <label className='lbl-export' style={{ color: "#000", textDecoration: "none" }}>
                    Plantilla.Csv
                  </label>
                </div>
                <FileDownloadOutlinedIcon />
              </div>
            </Typography>

            <Button type='submit' id="accept-export">Aceptar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
