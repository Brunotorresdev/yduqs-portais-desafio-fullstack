import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export function PurchaseOptionsFooter() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box mt={2}>
      <Accordion
        expanded={expanded === 'incentivo'}
        onChange={handleChange('incentivo')}
        sx={{
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
          mb: 1,
        }}
      >
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sobre a Bolsa Incentivo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            A Bolsa Incentivo oferece condições especiais para apoiar seus estudos. Entre em contato
            com nossa equipe para saber mais detalhes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'resumo'}
        onChange={handleChange('resumo')}
        sx={{
          borderRadius: '8px',
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
        }}
      >
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Resumo das suas escolhas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Aqui você encontrará um resumo geral das opções selecionadas no processo de compra.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
