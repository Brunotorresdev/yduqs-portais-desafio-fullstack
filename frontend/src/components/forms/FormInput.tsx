'use client';
import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { ErrorMessage, useFormikContext } from 'formik';

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
  const { values, handleChange, handleBlur, setFieldValue } = useFormikContext<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formatValue) {
      const formatted = formatValue(e.target.value);
      setFieldValue(name, formatted);
    } else {
      handleChange(e);
    }
  };

  return (
    <Box mb={3}>
      <TextField
        sx={{ '.MuiFormHelperText-root': { color: 'red' } }}
        fullWidth
        label={placeholder}
        // placeholder={placeholder}
        name={name}
        type={type}
        value={values[name] || ''}
        onChange={handleInputChange}
        onBlur={handleBlur}
        helperText={<ErrorMessage name={name} />}
        error={!!(values[name] && <ErrorMessage name={name} />)}
        inputProps={{ maxLength }}
        multiline={multiline}
        rows={rows}
      />
      {helperText && (
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
