import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { Stack } from "@mui/system";
import Head from "next/head";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  seasonsArr,
  resolutionsArr,
  monthsArr,
} from "../constants/encapsulateConsts";

import { signOut } from "next-auth/react";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Encapsulate() {
  const [resolution, setResolution] = useState("Month");

  // true = all songs, false = most played
  const [mode, setMode] = useState(true);

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2022");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [season, setSeason] = useState("Spring");

  const handleResolutionChange = (event) => {
    setResolution(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  const toggleMode = (event) => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };
  return (
    <div>
      <Head>
        <title>Encapsulate!</title>
        <meta name="description" content="Make your capsule" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <h1>Encapsulate your playlist!</h1>
        </Grid>
        <Grid item xs={3} sx={{ minHeight: "460px" }}>
          <Stack spacing={2}>
            <Stack spacing={-2} alignItems="center">
              <h3>Mode</h3>
              <Stack spacing={3} direction="row" alignItems="center">
                All songs
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  unchecked
                  onChange={toggleMode}
                />
                Most played songs
              </Stack>
            </Stack>
            <Stack spacing={0} alignItems="center">
              <h3>Resolution</h3>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select value={resolution} onChange={handleResolutionChange}>
                    {resolutionsArr.map((resolution) => {
                      return (
                        <MenuItem key={resolution} value={resolution}>
                          {resolution}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            {resolution == "Month" ? (
              <Stack spacing={0} alignItems="center">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Stack spacing={0} alignItems="center">
                    <h3>Month</h3>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select value={month} onChange={handleMonthChange}>
                          {monthsArr.map((month) => {
                            return (
                              <MenuItem key={month} value={month}>
                                {month}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                  <Stack spacing={0} alignItems="center">
                    <h3>Year</h3>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select value={year} onChange={handleYearChange}>
                          {/* Years should start at the first possible year for the account accessed */}
                          <MenuItem value={"2022"}>2022</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            ) : resolution == "Season" ? (
              <Stack spacing={0} alignItems="center">
                <h3>Season</h3>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select value={season} onChange={handleSeasonChange}>
                      {seasonsArr.map((season) => {
                        return (
                          <MenuItem key={season} value={season}>
                            {season}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            ) : (
              <Stack spacing={0} alignItems="center">
                <h3>Date range</h3>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newStartDate) => {
                        setStartDate(newStartDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={params?.inputProps?.placeholder}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newEndDate) => {
                        setEndDate(newEndDate);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={params?.inputProps?.placeholder}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#1DB954",
              "&:hover": { backgroundColor: "#33c065" },
              color: "white",
            }}
            onClick={() => ({
              callbackUrl: "http://localhost:3000/",
            }) //generate
            }
          >
            Generate Playlist!
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#FE0101",
              "&:hover": { backgroundColor: "#FE4E4E" },
              color: "white",
            }}
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
