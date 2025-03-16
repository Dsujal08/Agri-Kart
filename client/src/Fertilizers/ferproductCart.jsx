import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconCart from "../images/iconCart.png";
import { useCart } from "./FerCart";
import { AppContent } from "../content/AppContent"; // Ensure this context provides userData
import { toast } from "react-toastify";

const ProductCart = ({ data }) => {
    const { addToCart } = useCart();
    const { userData } = useContext(AppContent); // Accessing user authentication state
    const navigate = useNavigate();

    const { id, name, price, image, slug, description, category, discount = 0 } = data;
    const [added, setAdded] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const timeoutRef = useRef(null);

    const discountedPrice = discount ? Math.round(price - (price * discount) / 100) : price;

    const handleAddToCart = () => {
        if (isAdding) return;

        if (!userData) {
            toast.error("Please log in to add items to your cart.");
            navigate("/login");
            return;
        }

        setIsAdding(true);
        addToCart({
            productId: id,
            name,
            price: discountedPrice,
            image,
            quantity: 1,
        });

        setAdded(true);
        timeoutRef.current = setTimeout(() => {
            setAdded(false);
            setIsAdding(false);
        }, 2000);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 duration-300 relative flex flex-col">
            {category && (
                <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {category}
                </span>
            )}

            {discount > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                    {discount}% OFF
                </span>
            )}

            <Link to={`/product/${slug}`} className="block">
                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    />
                    {added && (
                        <div className="absolute inset-0 bg-green-200 opacity-30 rounded-lg animate-ping"></div>
                    )}
                </div>
            </Link>

            <div className="flex flex-col items-center text-center mt-4">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mt-1">{description.slice(0, 50)}...</p>

                <p className="text-lg font-bold text-green-600 mt-2">
                    {discount ? (
                        <>
                            <span className="text-red-500 line-through text-sm mr-2">₹{price}</span>
                            ₹{discountedPrice}
                        </>
                    ) : (
                        `₹${price}`
                    )}
                </p>
            </div>

            <div className="mt-4 relative">
                <button
                    className={`w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center gap-2 
                                transition hover:bg-green-600 active:scale-95 focus:ring-2 focus:ring-green-400 ${
                                    isAdding ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    aria-label={`Add ${name} to Cart`}
                >
                    <img src={iconCart} alt="Cart Icon" className="w-5" />
                    {isAdding ? "Adding..." : "Add To Cart"}
                </button>

                {added && (
                    <span
                        className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-green-500 text-white text-xs px-3 py-1 rounded-md shadow-md 
                                opacity-100 transition-opacity duration-500 animate-fadeInOut whitespace-nowrap"
                        aria-live="polite"
                    >
                        Added to Cart!
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProductCart;
