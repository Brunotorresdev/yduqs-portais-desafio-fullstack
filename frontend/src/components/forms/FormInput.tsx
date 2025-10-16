'use client';
import React, { type ChangeEvent } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { ErrorMessage, useFormikContext } from 'formik';
import type { DOMElement } from '@/types/dom';

interface FormInputProps {
  name: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
  helperText?: string;
  formatValue?: (value: string) => string;
  multiline?: boolean;
  rows?: number;
}

export function FormInput({
  name,
  placeholder,
  type = 'text',
  maxLength,
  helperText,
  formatValue,
  multiline = false,
  rows,
}: FormInputProps) {
  const { values, handleChange, handleBlur, setFieldValue, touched, errors } = useFormikContext<{
    [key: string]: string;
  }>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formatValue) {
      const formatted = formatValue(e.target.value);
      setFieldValue(name, formatted);
    } else {
      handleChange(e);
    }
  };

  const hasError = touched[name] && errors[name];

  return (
    <Box mb={3}>
      <TextField
        fullWidth
        label={placeholder}
        name={name}
        type={type}
        value={values[name] || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        helperText={hasError && <ErrorMessage name={name} />}
        error={!!hasError}
        FormHelperTextProps={{
          sx: {
            color: '#d32f2f',
            margin: 0,
            marginTop: '4px',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: hasError ? '#d32f2f' : '#144BC8',
            },
            '&:hover fieldset': {
              borderColor: hasError ? '#d32f2f' : '#144BC8',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: hasError ? '#d32f2f' : '#144BC8',
          },
        }}
        inputProps={{ maxLength }}
        multiline={multiline}
        rows={rows}
      />
      {helperText && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
