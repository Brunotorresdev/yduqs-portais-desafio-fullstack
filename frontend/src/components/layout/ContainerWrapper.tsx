'use client';

import { Box, BoxProps } from '@mui/material';

export function ContainerWrapper({ children, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        maxWidth: 1190,
        margin: 'auto',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
