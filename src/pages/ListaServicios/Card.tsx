import React, { useState, useContext, useCallback, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { EditServiceModal } from './ModalEditService';
import { EditServiceModalChildren } from './ModalEditServiceChildren';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AddServiceModal from './Modal';
import { ServiciosContext } from '../../Context/serviciosContext';
import { ServicioPadre, ServicioHijo, ServicioContext } from '../../types/services';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { AddChildServiceModal } from './ModalChild';
import './styles.css';

const ServicioAccordion = React.memo(({ servicio, expanded, handleAccordionChange, handleOpen }: { 
  servicio: ServicioPadre, 
  expanded: string | false, 
  handleAccordionChange: (panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void,
  handleOpen: (id: number, isChildService?: boolean, childId?: number | null) => void
}) => {
  return (
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
          <EditServiceModal servicio={servicio} parentId={servicio.id} />
          <PowerSettingsNewIcon onClick={() => handleOpen(servicio.id)} />
        </div>
      </AccordionSummary>
    </Accordion>
  );
});
const ServicioHijoAccordion = React.memo(({ child, parentId, handleOpen }: {
  child: ServicioHijo,
  parentId: number,
  handleOpen: (id: number, isChildService: boolean, childId: number | null) => void
}) => {
  return (
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
          <EditServiceModalChildren servicio={child} parentId={parentId} />
          <PowerSettingsNewIcon onClick={() => handleOpen(parentId, true, child.id)} />
        </div>
      </AccordionSummary>
    </Accordion>
  );
});

export function BasicCard() {
  const { serviciosPadres, deleteService } = useContext<ServicioContext>(ServiciosContext);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [currentChildServiceId, setCurrentChildServiceId] = useState<number | null>(null);
  const [isChild, setIsChild] = useState(false);

  const handleAccordionChange = useCallback((panelId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    event.preventDefault();
    setExpanded(isExpanded ? panelId : false);
  }, []);

  const handleOpen = useCallback((id: number, isChildService = false, childId: number | null = null) => {
    setCurrentServiceId(id);
    setIsChild(isChildService);
    setCurrentChildServiceId(childId);
    setOpen(true);
  }, []);

  const handleCloseNegative = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (isChild && currentServiceId !== null && currentChildServiceId !== null) {
      deleteService?.(currentChildServiceId, 2, currentServiceId);
    } else if (!isChild && currentServiceId !== null) {
      deleteService?.(currentServiceId, 1, currentServiceId);
    }
    setOpen(false);
  }, [isChild, currentServiceId, currentChildServiceId, deleteService]);

  const memoizedServiciosPadres = useMemo(() => serviciosPadres, [serviciosPadres]);

  return (
    <div id="services">
      <Card sx={{ maxWidth: 1200 }} id="card-list-services">
        <CardContent>
          <div className="title-catalog">Catálogo de servicios</div>
          <div style={{ marginLeft: "30px", marginTop: "10px" }}>
            <AddServiceModal />
          </div>
          {memoizedServiciosPadres && memoizedServiciosPadres.map((servicio: ServicioPadre) => (
            <div key={servicio.id}>
              <ServicioAccordion
                servicio={servicio}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
                handleOpen={handleOpen}
              />
              {expanded === servicio.id.toString() && (
                <div style={{ marginLeft: "60px", marginTop: "10px" }}>
                  <AddChildServiceModal parentId={servicio.id} />
                  {servicio.serviciosHijo && servicio.serviciosHijo.map((child: ServicioHijo) => (
                    <ServicioHijoAccordion
                      key={child.id}
                      child={child}
                      parentId={servicio.id}
                      handleOpen={handleOpen}
                    />
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

