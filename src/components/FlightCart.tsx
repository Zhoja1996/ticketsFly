import { useDispatch } from "react-redux";
import { memo, useMemo, useCallback } from "react";
import type { CartItem } from "../redux/Types/types";
import { removeFromCart } from "../redux/Slices/CartSlice";

interface Props {
    item: CartItem;
}

const FlightCart = memo(({ item }: Props) => {
    const dispatch = useDispatch();

    const departureDate = useMemo(() => {
        return new Date(item.flight.departureTime).toLocaleDateString();
    }, [item.flight.departureTime]);

    const departureTime = useMemo(() => {
        return new Date(item.flight.departureTime).toLocaleTimeString();
    }, [item.flight.departureTime]);

    const handleRemove = useCallback(() => {
        dispatch(removeFromCart(item.id));
    }, [dispatch, item.id]);

    return (
        <li className="p-4 bg-gray-100 border border-gray-300 rounded-md">
            <div className="flex justify-between items-center">
                <div>
                    <p><span className="font-semibold">Рейс:</span> {item.flight.from} → {item.flight.to}</p>
                    <p><span className="font-semibold">Авіакомпанія:</span> {item.flight.airline}</p>
                    <p><span className="font-semibold">Дата:</span> {departureDate}</p>
                    <p><span className="font-semibold">Час:</span> {departureTime}</p>
                    <p><span className="font-semibold">Місця:</span> {item.selectedSeats.map(seat => seat.id).join(", ")}</p>
                    <p><span className="font-semibold">Ціна за квиток:</span> {item.flight.price} ₴</p>
                    <p><span className="font-semibold">Разом:</span> {Number(item.flight.price) * item.selectedSeats.length} ₴</p>
                </div>

                <button
                    onClick={handleRemove}
                    className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm cursor-pointer"
                >
                    Видалити
                </button>
            </div>
        </li>
    );
});

export default FlightCart;