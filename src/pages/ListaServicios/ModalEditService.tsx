import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import './styles.css';
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

interface Props {
  servicio: ServicioPadre;
  parentId: number | null; // Para pasar el ID del padre si es necesario
}

export const EditServiceModal = ({ servicio, parentId }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { updateService } = useContext(ServiciosContext) || {};
  const [formData, setFormData] = useState<ServicioPadre>(servicio);

  useEffect(() => {
    setFormData(servicio);
  }, [servicio]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && updateService) {
      updateService(formData, parentId); // Pasa el parentId si es necesario
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ textTransform: 'lowercase', color: '#31C462', marginLeft: '50px' }}>
        <ModeOutlinedIcon />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ mt: 8 }}
        id="modal-edit-service"
      >
        <Box sx={style}>
          <CloseIcon id="cancel" onClick={handleClose} style={{ cursor: 'pointer' }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar categoría - Servicio
          </Typography>

          <form className="Form" onSubmit={handleSaveService}>
            <Box sx={{ mt: 4 }}>
              <TextField
                id="name"
                label="Nombre *"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={handleForm}
              />
            </Box>
            <Box sx={{ mt: 4 }}>
              <TextField
                id="description"
                label="Descripción del servicio *"
                multiline
                rows={3}
                fullWidth
                value={formData.description}
                onChange={handleForm}
              />
            </Box>
            <Button
              variant="contained"
              id="btn-accept"
              type="submit"
              sx={{ mt: 2 }}
            >
              Aceptar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}