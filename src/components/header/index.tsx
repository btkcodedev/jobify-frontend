import React, { useEffect, useState } from 'react';
import { Box, Sheet, Typography } from '@mui/joy';
import { Clock } from 'lucide-react';

const currentLocale = navigator.language;

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [])

  const updateTime = () => {
    const now = new Date();

    const formattedTime = now.toLocaleString(currentLocale, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setCurrentTime(formattedTime);
  };

  return (
    <Sheet
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          p: 2,
          borderRadius: { xs: 0, sm: 'sm' },
          minWidth: 'min-content',
          width: '100%'
        },
      ]}
    >
      <Box display="flex" justifyContent="space-between" width="100%" gap={1}>
        <Box>
          <Typography level="h1">Jobify</Typography>
        </Box>
        <Box display="flex" gap={1} justifyContent="center" alignItems="center">
          <Clock />
          <Typography level="body-sm">
            {currentTime}
          </Typography>
        </Box>
      </Box>
    </Sheet>
  );
}
