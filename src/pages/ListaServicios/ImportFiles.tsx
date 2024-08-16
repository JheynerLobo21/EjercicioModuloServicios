import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { ServiciosContext } from "../../Context/serviciosContext";
import { ServicioContext } from "../../types/services";
import {
  handleFileUpload,
  handleChangeExcel,
  handleChangeCsv,
  handleExportToCsv,
  handleExportToExcel,
} from "../../Utils/FileHandler";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ImportFile() {
  const [open, setOpen] = useState(false);
  const [modeExport, setModeExport] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { serviciosPadres, saveService } =
    useContext<ServicioContext>(ServiciosContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modeExport === "csv") {
      handleExportToCsv(serviciosPadres);
    } else if (modeExport === "excel") {
      handleExportToExcel(serviciosPadres);
    }
  };

  return (
    <div>
      <div id="icons-import" style={{ position: "relative" }}>
        <Button
          onClick={handleOpen}
          style={{
            color: "#595959",
            position: "absolute",
            right: "130px",
            bottom: "20px",
          }}
        >
          <FileOpenOutlinedIcon style={{ color: "#070707" }} />
        </Button>
        <SaveOutlinedIcon
          style={{ position: "absolute", right: "105px", bottom: "25px" }}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-import-export"
        style={{ borderRadius: "10px" }}
      >
        <Box sx={style}>
          <CloseIcon
            id="cancel"
            onClick={handleClose}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "20px",
              top: "20px",
            }}
          />
          <Typography id="" variant="h6" component="h5">
            <span>Importar</span>
          </Typography>
          <div id="modal-modal-description">
            <TextField
              id="file-input"
              label="Seleccionar archivo"
              type="file"
              inputRef={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileUpload(
                  e as React.ChangeEvent<HTMLInputElement>,
                  saveService,
                  setOpen
                )
              }
            />
            <Button id="importfile" onClick={handleButtonClick}>
              <label
                className="lbl-import"
                style={{ color: "#000", textTransform: "lowercase" }}
              >
                Seleccionar Archivo
              </label>
              <FolderOpenIcon />
            </Button>
            <span className="plantilla">
              Descarga plantilla de importación de datos
            </span>
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h5">
            <span id="export">Exportar</span>
          </Typography>
          <form onSubmit={handleSubmit} className="form-export">
            <Typography id="modal-description" sx={{ mt: 2 }} component="div">
              <div
                id="exportFileExcel"
                onClick={() => handleChangeExcel(setModeExport)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ArticleOutlinedIcon id="icon-file" />
                  <label
                    className="lbl-export"
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    Plantilla.Excel
                  </label>
                </div>
                <FileDownloadOutlinedIcon />
              </div>
            </Typography>

            <Typography id="modal-description" sx={{ mt: 2 }} component="div">
              <div
                id="exportFileCsv"
                onClick={() => handleChangeCsv(setModeExport)}
              >
                <div>
                  <ArticleOutlinedIcon id="icon-file" />
                  <label
                    className="lbl-export"
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    Plantilla.Csv
                  </label>
                </div>
                <FileDownloadOutlinedIcon />
              </div>
            </Typography>

            <Button type="submit" id="accept-export">
              Aceptar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
