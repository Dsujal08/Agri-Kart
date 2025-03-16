import React from "react";
import { useCart } from "./FerCart";

const CartItem = ({ data }) => {
    const { productId, name, price, image, quantity } = data;
    const { changeQuantity, removeFromCart } = useCart();

   
    if (!productId || !name || !price || !image) return null;

    const handleDecrease = () => {
        if (quantity > 1) {
            changeQuantity(productId, quantity - 1);
        }
    };

    const handleIncrease = () => {
        changeQuantity(productId, quantity + 1);
    };

    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-3 border-b border-gray-700 rounded-md shadow-md hover:shadow-lg transition">
            {/* Product Image */}
            <img src={image} alt={name} className="w-14 h-14 rounded-md object-cover" />

            {/* Product Details */}
            <div className="flex-1 px-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-300">₹{(Number(price) * quantity).toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    className="bg-gray-300 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center font-bold hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                    aria-label={`Decrease quantity of ${name}`}
                >
                    −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                    className="bg-gray-300 text-gray-800 rounded-full w-7 h-7 flex items-center justify-center font-bold hover:bg-gray-400 transition"
                    onClick={handleIncrease}
                    aria-label={`Increase quantity of ${name}`}
                >
                    +
                </button>
            </div>

            {/* Remove Button */}
            <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition active:scale-95"
                onClick={() => removeFromCart(productId)}
                aria-label={`Remove ${name} from cart`}
            >
                Remove
            </button>
        </div>
    );
};

export default CartItem;
