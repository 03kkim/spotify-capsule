import { Box, Button, CssBaseline, FormControl, MenuItem, Select, Switch, } from '@mui/material'
import { Stack } from '@mui/system'
import Head from 'next/head'
// import styles from '../styles/Home.module.css'

import { useState } from 'react'
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Encapsulate() {
  const [resolution, setResolution] = useState("Month");

  // true = all songs, false = most played
  const [mode, setMode] = useState(true);

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [season, setSeason] = useState("");
  

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const toggleMode = (event) => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  }
  return (
    <div>
      <Head>
        <title>Encapsulate!</title>
        <meta name="description" content="Make your capsule" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Stack spacing={4} alignItems="center" justifyContent="flex-end" sx={{mt: "100px"}}>
        <h1>Encapsulate your playlist!</h1>
        <Stack spacing={4}>
          <Stack spacing={-2} alignItems="center">
            <h3>Mode</h3>
            <Stack spacing={3} direction="horizontal" alignItems="center">
              All songs
                <MaterialUISwitch sx={{ m: 1 }} unchecked onChange={toggleMode} />
              Most played songs
            </Stack>
          </Stack>
          
          <Stack spacing={0} alignItems="center">
            <h3>Resolution</h3>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                value={resolution}

                onChange={handleResolutionChange}
                >
                  <MenuItem value={"Month"}>Month</MenuItem>
                  <MenuItem value={"Season"}>Season</MenuItem>
                  <MenuItem value={"Date Range"}>Date Range</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>

          
          {resolution == "Month" ?
            <Stack spacing={0} alignItems="center" sx={{pb: "50px"}}>
              <Stack direction="horizontal" alignItems="center" justifyContent="center" spacing={10}>
                <Stack spacing={0} alignItems="center">
                  <h3>Month</h3>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                      value={month}
                      onChange={handleMonthChange}
                      >
                        <MenuItem value={"January"}>January</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
                <Stack spacing={0} alignItems="center">
                  <h3>Year</h3>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                      value={year}
                      onChange={handleYearChange}
                      >
                        <MenuItem value={"2022"}>2022</MenuItem>
                        
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Stack>
            </Stack> : 

          resolution == "Season" ? 
            <Stack spacing={0} alignItems="center" sx={{pb: "50px"}}>
              <h3>Season</h3> 
            </Stack> : 

            <Stack spacing={0} alignItems="center" sx={{pb: "50px"}}>
              <h3>Date range</h3>
            </Stack>  
          }
          


          <Button variant="contained"  
                  size="large"
                  sx={{
                    backgroundColor: "#1DB954",
                    '&:hover': {backgroundColor: '#33c065'},
                    color: "white",
          }}>
              Generate Playlist!
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}