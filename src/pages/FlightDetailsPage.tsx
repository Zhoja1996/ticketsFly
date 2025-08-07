import { CircularProgress } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/Slices/CartSlice";
import { fetchFlightById } from "../redux/Slices/FlightsSlice";
import type { AppDispatch, RootState } from "../redux/store";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { v4 as uuidv4 } from 'uuid';
import type { Seat } from "../redux/Types/types";

const generateSeats = (rows = 10, cols = 6): Seat[] => {
    const alphabet = "ABCDEF";
    const seats: Seat[] = [];

    for (let row = 1; row <= rows; row++) {
        for (let col = 0; col < cols; col++) {
            const id = `${row}${alphabet[col]}`;
            const isOccupied = Math.random() < 0.3;
            seats.push({
                id,
                row,
                column: alphabet[col],
                status: isOccupied ? "occupied" : "free",
            });
        }
    }

    return seats;
};

const FlightDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { selectedFlight, loading } = useSelector((state: RootState) => state.flights);

    const [seats, setSeats] = useState<Seat[]>([]);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchFlightById(id));
            setSeats(generateSeats());
            setIsAdded(false); // сброс состояния при смене рейса
        }
    }, [dispatch, id]);

    const handleSeatClick = useCallback((seatId: string) => {
        setSeats(prev =>
            prev.map(seat => {
                if (seat.id !== seatId || seat.status === "occupied") return seat;

                return {
                    ...seat,
                    status: seat.status === "selected" ? "free" : "selected",
                };
            })
        );
    }, []);

    const mappedSeats = useMemo(() => {
        const baseClass =
            "w-12 h-12 flex items-center justify-center rounded font-semibold cursor-pointer transition";

        const statusClass = {
            occupied: "bg-red-400 cursor-not-allowed",
            free: "bg-green-500 hover:bg-green-600 text-white",
            selected: "bg-blue-500 text-white",
        };

        return seats.map(seat => (
            <div
                key={seat.id}
                className={`${baseClass} ${statusClass[seat.status]}`}
                onClick={() => seat.status !== "occupied" && handleSeatClick(seat.id)}
            >
                {seat.id}
            </div>
        ));
    }, [seats, handleSeatClick]);

    const handleAddCart = useCallback(() => {
        const selectedSeats = seats.filter(seat => seat.status === "selected");

        if (!selectedFlight || selectedSeats.length === 0) {
            toast.warn("Оберіть хоча б одне місце!");
            return;
        }

        dispatch(
            addToCart({
                id: uuidv4(),
                flight: selectedFlight,
                selectedSeats,
            })
        );

        toast.success("Квиток додано до кошика! 🎉");
        setIsAdded(true);
    }, [dispatch, seats, selectedFlight]);

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 bg-white bg-opacity-60 flex justify-center items-center">
                    <CircularProgress />
                </div>
            )}

            <div className="flex justify-around items-center mt-3">
                <Link to={'/'}>
                    <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer">
                        <span className="text-2xl">←</span>
                        На головну
                    </h2>
                </Link>

                <Link to={'/cart'}>
                    <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer">
                        До кошику <ShoppingCartRoundedIcon />
                    </h2>
                </Link>
            </div>

            <div className="p-6 mx-auto flex justify-center items-center flex-col gap-3">
                {selectedFlight ? (
                    <>
                        <h1 className="text-3xl font-bold mb-2">
                            ✈️ {selectedFlight.from} → {selectedFlight.to}
                        </h1>
                        <p className="text-gray-600 mb-1">Авіакомпанія: {selectedFlight.airline}</p>
                        <p className="text-sm text-gray-500 mb-6">
                            Виліт: {new Date(selectedFlight.departureTime).toLocaleString()} | Прибуття:{" "}
                            {new Date(selectedFlight.arrivalTime).toLocaleString()}
                        </p>

                        <h2 className="text-xl font-semibold mb-4">Оберіть місця:</h2>

                        <div className="grid grid-cols-6 gap-3 w-full max-w-md">{mappedSeats}</div>

                        <div className="mt-6 space-y-2">
                            <p>
                                <span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded"></span> Вільне
                            </p>
                            <p>
                                <span className="inline-block w-4 h-4 bg-red-400 mr-2 rounded"></span> Зайняте
                            </p>
                            <p>
                                <span className="inline-block w-4 h-4 bg-blue-500 mr-2 rounded"></span> Обране
                            </p>
                        </div>

                        <button
                            disabled={isAdded}
                            className={`mt-5 px-6 py-3 font-semibold rounded-2xl shadow-md transition duration-600 ease-in-out active:scale-95 cursor-pointer
                            ${isAdded ? "bg-gray-400 cursor-none" : "bg-green-500 hover:bg-green-400 hover:shadow-lg"}`}
                            onClick={handleAddCart}
                        >
                            {isAdded ? "Додано ✅" : "Додати до кошика"} <AddShoppingCartRoundedIcon />
                        </button>
                    </>
                ) : (
                    <p>Рейс не знайдено</p>
                )}
            </div>
        </>
    );
};

export default FlightDetailsPage;