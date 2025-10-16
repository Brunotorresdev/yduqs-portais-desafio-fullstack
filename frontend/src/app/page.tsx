'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const timeout = window.setTimeout(() => {
      router.replace('/page-option');
      setLoading(false);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }
}, [router]);



  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      {loading ? <CircularProgress /> : null}
    </Box>
  );
}
