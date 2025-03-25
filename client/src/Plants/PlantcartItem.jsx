import React from "react";
import { useCart } from "./PlantCart";
import { Trash2 } from "lucide-react";

const CartItem = ({ data }) => {
    const { productId, name, price, image, quantity, stock } = data;
    const { changeQuantity, removeFromCart } = useCart();

    if (!productId || !name || !price || !image) return null;

    const handleDecrease = () => {
        if (quantity > 1) {
            changeQuantity(productId, quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < stock) {
            changeQuantity(productId, quantity + 1);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <img 
                src={image} 
                alt={name} 
                className="w-16 h-16 rounded-lg object-cover border border-gray-300" 
            />

            {/* Product Details */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-500">Price: ₹{price.toFixed(2)}</p>
                <p className="text-sm text-green-600 font-medium">Total: ₹{(Number(price) * quantity).toFixed(2)}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <button
                    className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                    aria-label={`Decrease quantity of ${name}`}
                >
                    −
                </button>
                <span className="text-lg font-bold text-gray-900">{quantity}</span>
                <button
                    className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleIncrease}
                    disabled={quantity >= stock}
                    aria-label={`Increase quantity of ${name}`}
                >
                    +
                </button>
            </div>

            {/* Remove Button */}
            <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition active:scale-95 flex items-center gap-1 shadow-sm"
                onClick={() => removeFromCart(productId)}
                aria-label={`Remove ${name} from cart`}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default CartItem;
