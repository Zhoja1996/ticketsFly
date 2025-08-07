import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../redux/Slices/FlightsSlice";
import type { AppDispatch, RootState } from "../redux/store";
import FlightCard from "../components/FlightCard";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from "react-router-dom";

const FlightsPage = () => {
  const [sortBy, setSortBy] = useState("default");
  const [filterByDestination, setFilterByDestination] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { flights, loading } = useSelector((state: RootState) => state.flights);

  const filteredFlights = useMemo(() => {
    return flights
      .filter(flight =>
        flight.to.toLowerCase().includes(filterByDestination.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "departure":
            return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
          case "arrival":
            return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
          case "tickets":
            return b.tickets.remaining - a.tickets.remaining;
          case "airline":
            return a.airline.localeCompare(b.airline);
          case "default":
          default:
            return 0;
        }
      });
  }, [flights, filterByDestination, sortBy]);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  return loading ? (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className="pt-5">
      <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center" alignItems={"center"}>
        <FormControl>
          <InputLabel id="sort-label">Сортувати по</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Сортувати по"
            size="small"
          >
            <MenuItem value="default">Звичайна</MenuItem>
            <MenuItem value="priceAsc">Ціна ↑</MenuItem>
            <MenuItem value="priceDesc">Ціна ↓</MenuItem>
            <MenuItem value="departure">Час виліту</MenuItem>
            <MenuItem value="arrival">Час прибуття</MenuItem>
            <MenuItem value="tickets">Кількість квитків</MenuItem>
            <MenuItem value="airline">Авіакампанії (А–Я)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Пошук за направленням"
          variant="outlined"
          size="small"
          value={filterByDestination}
          onChange={(e) => setFilterByDestination(e.target.value)}
        />

        <Link to={'/cart'}>
            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer">
                До кошику <ShoppingCartRoundedIcon />
            </h2>
        </Link>
      </Box>

      <Box sx={{ p: 4, width: '100%' }}>
        <Box sx={{ minHeight: '100vh', minWidth: '100%' }}>
          {filteredFlights.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {filteredFlights.map((flight) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={flight.id}>
                  <FlightCard flight={flight} loading={loading} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="40vh"
              textAlign="center"
              flexDirection="column"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="No flights"
                width={80}
                style={{ opacity: 0.5 }}
              />
              <Box mt={2} fontSize={18}>
                <strong>Рейсів не знайдено</strong>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default FlightsPage;