import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({ accordionLegend, children }) {

    return (

        <Accordion elevation={10} sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ background: 'rgba(9, 31, 67, 0.7)', color: '#FFFFFF', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            >
                <Typography>{accordionLegend}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}