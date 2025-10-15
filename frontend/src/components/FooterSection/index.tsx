import { AccordionDetails, AccordionSummary, Accordion, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FooterTitle, FooterLink } from '../MainFooter';

interface FooterSectionProps {
  title: string;
  links: Array<{ text: string; href: string }>;
  isMobile: boolean;
}

export function FooterSectionComponent({ title, links, isMobile }: FooterSectionProps) {
  return (
    <Grid width={'160px'} size={{ xs: 12, sm: 3 }}>
      {isMobile ? (
        <Accordion
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#FFF' }} />}
            sx={{ padding: 0 }}
          >
            <FooterTitle sx={{ margin: 0 }}>{title}</FooterTitle>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0 0 0 16px' }}>
            {links.map((link, index) => (
              <FooterLink key={index} href={link.href}>
                {link.text}
              </FooterLink>
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <FooterTitle>{title}</FooterTitle>
          {links.map((link, index) => (
            <FooterLink key={index} href={link.href}>
              {link.text}
            </FooterLink>
          ))}
        </>
      )}
    </Grid>
  );
}