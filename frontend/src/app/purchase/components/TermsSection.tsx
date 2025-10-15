'use client';
import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

export function TermsSection() {
  return (
    <>
      <Box mb={3}>
        <FormControlLabel
          sx={{
            alignItems: 'flex-start',
            '.MuiFormControlLabel-label': { marginTop: '-2px' },
            '.MuiButtonBase-root': { p: '0 9px 0 8px' },
          }}
          control={
            <Field
              as={Checkbox}
              name='acceptTerms'
              color='primary'
              sx={{
                color: '#000',
                '&.Mui-checked': { color: '#000' },
              }}
            />
          }
          label={
            <Typography
              variant='body2'
              sx={{
                fontFamily: '"Inter", "Roboto", sans-serif',
                fontSize: '16px',
                lineHeight: '133%',
                fontWeight: 500,
              }}
            >
              Li e concordo com os termos do edital, bem como com o tratamento dos meus dados para
              fins de prospecção dos serviços educacionais prestados pela Estácio e demais
              instituições de ensino do mesmo Grupo Econômico, de acordo com a nossa política de
              privacidade.
            </Typography>
          }
        />
        <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
          <ErrorMessage name='acceptTerms' component='div' />
        </div>
      </Box>

      <Box mb={4}>
        <FormControlLabel
          sx={{
            alignItems: 'flex-start',
            '.MuiFormControlLabel-label': { marginTop: '-2px' },
            '.MuiButtonBase-root': { p: '0 9px 0 8px' },
          }}
          control={
            <Field
              as={Checkbox}
              name='acceptWhatsApp'
              color='primary'
              sx={{
                color: '#000',
                '&.Mui-checked': { color: '#000' },
              }}
            />
          }
          label={
            <Typography
              variant='body2'
              sx={{
                fontFamily: '"Inter", "Roboto", sans-serif',
                fontSize: '16px',
                lineHeight: '133%',
                fontWeight: 500,
              }}
            >
              Aceito receber atualizações sobre minha inscrição pelo WhatsApp.
            </Typography>
          }
        />
      </Box>
    </>
  );
}
