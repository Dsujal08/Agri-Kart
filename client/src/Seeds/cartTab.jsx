import React from "react";
import { useCart } from "./Cart";
import { useNavigate } from "react-router-dom";
import CartItem from "./cartItem";
import { products } from "./products";

const CartTab = () => {
    const { items, statusTab, toggleStatusTab, updateCartItem, removeFromCart } = useCart();
    const navigate = useNavigate();

    const cartWithPrices = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return { ...item, price: 0, stock: 0 };

        const discountedPrice = product.discount
            ? (product.price - (product.price * product.discount) / 100)
            : product.price;

        return { ...item, price: discountedPrice, stock: product.stock, image: product.image };
    });

    const totalPrice = cartWithPrices.reduce((total, item) => total + item.price * item.quantity, 0);
    const hasOutOfStockItems = cartWithPrices.some((item) => item.quantity > item.stock);

    const handleQuantityChange = (productId, quantity, stock) => {
        if (quantity > 0 && quantity <= stock) {
            updateCartItem(productId, quantity);
        } else if (quantity === 0) {
            removeFromCart(productId);
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 bg-white shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_140px] 
            transform transition-transform duration-500 border-l border-gray-300 rounded-l-xl
            ${statusTab ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-green-600 text-white rounded-tl-xl">
                <h2 className="text-xl font-semibold">🛒 Shopping Cart</h2>
                <button
                    className="text-white hover:bg-green-700 transition text-2xl px-3 py-1 rounded-md"
                    onClick={toggleStatusTab}
                >
                    ✕
                </button>
            </div>

            {/* Cart Items - Scrollable */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[65vh] bg-gray-50">
                {cartWithPrices.length > 0 ? (
                    cartWithPrices.map((item) => (
                        <CartItem key={item.productId} data={item} onQuantityChange={handleQuantityChange} />
                    ))
                ) : (
                    <div className="text-center flex flex-col items-center justify-center animate-fadeIn">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                            className="w-28 h-28 opacity-50"
                        />
                        <p className="text-gray-500 text-lg mt-2">Your cart is empty.</p>
                    </div>
                )}
                {hasOutOfStockItems && (
                    <p className="text-red-600 text-center mt-3 font-medium animate-pulse">
                        ⚠️ Some items exceed available stock. Adjust quantities before checkout.
                    </p>
                )}
            </div>

            {/* Footer - Total & Buttons */}
            <div className="p-5 border-t border-gray-200 bg-white rounded-bl-xl">
                <div className="flex justify-between text-gray-900 text-xl font-bold animate-fadeIn">
                    <span>Total:</span>
                    <span className="text-green-700">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                        className="bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition font-semibold"
                        onClick={toggleStatusTab}
                    >
                        Close
                    </button>
                    <button
                        className={`py-3 rounded-md text-white font-semibold text-lg transition 
                        ${hasOutOfStockItems || cartWithPrices.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 animate-fadeIn"}`}
                        onClick={() => !hasOutOfStockItems && cartWithPrices.length > 0 && navigate("/checkout")}
                        disabled={hasOutOfStockItems || cartWithPrices.length === 0}
                    >
                        Checkout →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartTab;