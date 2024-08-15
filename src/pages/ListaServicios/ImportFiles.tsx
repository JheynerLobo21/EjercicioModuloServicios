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
  const [modeExport, setModeExport]= useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { saveService } = useContext(ServiciosContext) as any;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    const selectedbutton = document.getElementById("importfile")?.classList;
    
    selectedbutton?.add("selected");
  };

  const handleChangeExcel=()=>{
    setModeExport("excel");
    const selectedDivExcel = document.getElementById("exportFileExcel")?.classList;
    const selectedDivCsv = document.getElementById("exportFileCsv")?.classList;
    
    selectedDivExcel?.add("selected");
    selectedDivCsv?.remove("selected");
  }

  const handleChangeCsv=()=>{
    setModeExport("csv");
    const selectedDivExcel = document.getElementById("exportFileExcel")?.classList;
    const selectedDivCsv = document.getElementById("exportFileCsv")?.classList;
    
    selectedDivCsv?.add("selected");
    selectedDivExcel?.remove("selected");
  }

  const handleSubmit=()=>{

  }

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
            <h5>Importar</h5>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
              <label className='lbl-import' style={{ color:"#000", textTransform:"lowercase" }}>
                Seleccionar Archivo
              </label>
              <FolderOpenIcon />
            </Button>
            <span className='plantilla'>Descarga plantilla de importación de datos</span>
          </Typography>
          
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h5 style={{ marginTop:"40px" }}>Exportar</h5>
          </Typography>
          <form onSubmit={handleSubmit} className='form-export'>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <div id="exportFileExcel" onClick={handleChangeExcel}>
              <div>
                <ArticleOutlinedIcon id="icon-file" />
                <label className='lbl-export' style={{ color:"#000", textDecoration:"none" }}>
                  Plantilla.Excel
                </label>
              </div>
              <FileDownloadOutlinedIcon />
            </div> 
          </Typography>
          
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <div id="exportFileCsv" onClick={handleChangeCsv}>
              <div>
                <ArticleOutlinedIcon id="icon-file" />
                <label className='lbl-export' style={{ color:"#000", textDecoration:"none" }}>
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
