import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback } from "react";
import type { RootState } from "../redux/store";
import { clearCart } from "../redux/Slices/CartSlice";
import FlightCart from "../components/FlightCart";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const pricePerSeat = Number(item.flight.price);
      return sum + pricePerSeat * item.selectedSeats.length;
    }, 0);
  }, [items]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-between flex-col gap-5">
      <Link to={'/'}>
        <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer mt-3">
          <span className="text-2xl">←</span>
          На головну
        </h2>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5">
        <h2 className="text-2xl font-bold mb-4">Кошик 🛒</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">Кошик порожній</p>
        ) : (
          <ul className="space-y-4">
            {items.map(item => (
              <FlightCart key={item.id} item={item} />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-6 flex justify-between items-center border-t pt-4 gap-10">
            <div className="text-xl font-semibold">Загальна вартість: {total} ₴</div>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
            >
              Очистити кошик <RemoveShoppingCartOutlinedIcon/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;