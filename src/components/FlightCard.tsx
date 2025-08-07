import { memo, useMemo, useState, useCallback } from 'react';
import { Card, CardContent, Typography, Box, Divider, CircularProgress, Button, IconButton } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import type { Iflight } from '../redux/Types/types';

type Props = {
  flight: Iflight;
  loading: boolean;
};

const FlightCard = memo(({ flight, loading }: Props) => {
  const [isFavorite, setIsFavourite] = useState(false);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavourite((prev) => !prev);
  }, []);

  const departure = useMemo(
    () => new Date(flight.departureTime).toLocaleString(),
    [flight.departureTime]
  );
  const arrival = useMemo(
    () => new Date(flight.arrivalTime).toLocaleString(),
    [flight.arrivalTime]
  );

  return (
    <Card sx={{ maxWidth: 400, width: '100%', m: 2, boxShadow: 3, minHeight: 300 }}>
      <CardContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              ✈️ {flight.airline}
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">
                <strong>{flight.from}</strong>
              </Typography>
              <Typography variant="subtitle1">➡️</Typography>
              <Typography variant="subtitle1">
                <strong>{flight.to}</strong>
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="body2" color="text.secondary">
              Departure: <strong>{departure}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Arrival: <strong>{arrival}</strong>
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Terminal: <strong>{flight.terminal}</strong>, Gate:{' '}
              <strong>{flight.gate}</strong>
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6" color="primary">
              ${flight.price}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Tickets left: <strong>{flight.tickets.remaining}</strong> / {flight.tickets.total}
            </Typography>

            <Box mt={2} display="flex" alignItems="center">
              <Box>
                <Link to={`/flight/${flight.id}`}>
                  <Button variant="outlined" size="small">
                    Показати більше
                  </Button>
                </Link>
              </Box>
              <Box ml={2}>
                <IconButton onClick={handleFavoriteToggle} color="warning">
                  {isFavorite ? <Star /> : <StarBorder />}
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
});

export default FlightCard;