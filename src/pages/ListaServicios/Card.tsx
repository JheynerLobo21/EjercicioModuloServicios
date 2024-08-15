import React, { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { EditServiceModal } from './ModalEditService';
import { EditServiceModalChildren } from './EditServiceModalChildren';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AddServiceModal from './Modal';
import { ServiciosContext } from '../../Context/serviciosContext';
import { ServicioPadre, ServicioHijo } from '../../types/services';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AddChildServiceModal } from './ModalChild';
import './styles.css';

export function BasicCard() {
  const { serviciosPadres, deleteService, deleteChildService } = useContext(ServiciosContext) as any;
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [currentChildServiceId, setCurrentChildServiceId] = useState<number | null>(null);
  const [isChild, setIsChild] = useState(false);

  const handleAccordionChange = (panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panelId : false);
  };

  const handleOpen = (id: number, isChildService = false, childId: number | null = null) => {
    setCurrentServiceId(id);
    setIsChild(isChildService);
    setCurrentChildServiceId(childId);
    setOpen(true);
  };

  const handleCloseNegative = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (isChild && currentServiceId !== null && currentChildServiceId !== null) {
      deleteChildService(currentServiceId, currentChildServiceId);
    } else if (!isChild && currentServiceId !== null) {
      deleteService(currentServiceId);
    }
    setOpen(false);
  };

  return (
    <div id="services">
      <Card sx={{ maxWidth: 1200 }} id="card-list-services">
        <CardContent>
          <div className="title-catalog">Catálogo de servicios</div>
          <div style={{ marginLeft: "30px", marginTop: "10px" }}>
            <AddServiceModal />
          </div>
          {serviciosPadres &&
            serviciosPadres.map((servicio: ServicioPadre) => (
              <div key={servicio.id}>
                <Accordion
                  expanded={expanded === servicio.id.toString()}
                  onChange={handleAccordionChange(servicio.id.toString())}
                  id="accordion-services"
                  style={{
                    width: "95%",
                    marginLeft: "30px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls={`panel-${servicio.id}-content`}
                    id={`panel-${servicio.id}-header`}
                  >
                    <Typography>{servicio.name}</Typography>
                    <div className="optionsClickService">
                      <EditServiceModal servicio={servicio} />
                      <PowerSettingsNewIcon onClick={() => handleOpen(servicio.id)} />
                    </div>
                  </AccordionSummary>
                  <Typography sx={{ padding: 2 }}>
                    {servicio.description}
                  </Typography>
                </Accordion>
                {expanded === servicio.id.toString() && (
                  <div style={{ marginLeft: "60px", marginTop: "10px" }}>
                    <AddChildServiceModal parentId={servicio.id} />
                    {servicio.serviciosHijo &&
                      servicio.serviciosHijo.map((child: ServicioHijo) => (
                        <Accordion
                          key={child.id}
                          style={{
                            width: "90%",
                            marginTop: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls={`panel-child-${child.id}-content`}
                            id={`panel-child-${child.id}-header`}
                          >
                            <Typography>{child.name}</Typography>
                            <div className="optionsClickService">
                              <EditServiceModalChildren servicio={child} />
                              <PowerSettingsNewIcon onClick={() => handleOpen(servicio.id, true, child.id)} />
                            </div>
                          </AccordionSummary>
                          <Typography sx={{ padding: 2 }}>
                            {child.description}
                          </Typography>
                        </Accordion>
                      ))}
                  </div>
                )}
              </div>
            ))}
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleCloseNegative}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Eliminar servicio"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isChild ? "¿Desea eliminar este servicio hijo?" : "¿Desea eliminar este servicio, incluidos los servicios hijo si los tiene?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNegative}>No</Button>
          <Button onClick={handleDelete} autoFocus>Si</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
