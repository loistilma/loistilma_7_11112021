import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomAccordion({ label, children, backgroundColor, textColor }) {

    return (

        <Accordion elevation={5} sx={{ borderRadius: 1 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ background: backgroundColor, color: textColor, borderRadius: 1 }}
            >
                <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderRadius: 1 }}>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}