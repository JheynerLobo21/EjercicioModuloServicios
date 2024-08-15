import { useState, useContext } from "react";
import { ServicioHijo } from "../../types/services";
import { ServiciosContext } from "../../Context/serviciosContext";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

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

export const AddChildServiceModal: React.FC<{ parentId: number }> = ({ parentId }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { saveService } = useContext(ServiciosContext);

    const [formData, setFormData] = useState<ServicioHijo>({
        id: 0,
        name: '',
        description: '',
        level: 2,
        idPadre: parentId,
    });

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSaveChildService = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.description) {
            saveService(formData, parentId);  
            setFormData({
                id: 0,
                name: '',
                description: '',
                level: 2,
                idPadre: parentId,
            });
            handleClose();
        } else {
            console.error('Form data is incomplete:', formData);
        }
    };

    return (
        <div>
            <Button onClick={handleOpen} style={{ textTransform: 'lowercase', color: '#31C462' }}>
                + Agregar categoría / servicio
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                    <Typography variant="h6" component="h2">
                        Agregar servicio hijo
                    </Typography>

                    <form onSubmit={handleSaveChildService}>
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
};
