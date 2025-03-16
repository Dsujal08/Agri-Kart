import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./Ferproducts";
import { useCart } from "./FerCart";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fer_Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart = [] } = useCart(); // ✅ Ensure cart defaults to an empty array
  const [selectedImage, setSelectedImage] = useState("");

  // Find the product
  const detail = products.find((product) => product.slug === slug);

  useEffect(() => {
    if (!detail) {
      navigate("/product");
      return;
    }
    setSelectedImage(detail.image || "/product");
  }, [detail, navigate]); // ✅ Added `detail` dependency

  if (!detail) return <p className="text-center text-gray-500">Loading product details...</p>;

  const isOutOfStock = detail.stock === 0;

  // Calculate discounted price
  const discountAmount = detail.discount ? (detail.price * detail.discount) / 100 : 0;
  const discountedPrice = detail.price - discountAmount;

  // Handle Quantity Changes
  const handleMinusQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handlePlusQuantity = () => setQuantity((prev) => (prev < detail.stock ? prev + 1 : prev));

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const cartItem = cart.find((item) => item.productId === detail.id);
    const totalQuantity = (cartItem ? cartItem.quantity : 0) + quantity;

    if (totalQuantity > detail.stock) {
      toast.warn(`Only ${detail.stock} items available in stock!`);
      return;
    }

    addToCart({
      productId: detail.id,
      name: detail.name,
      price: discountedPrice,
      originalPrice: detail.price,
      image: detail.image || "",
      quantity,
      discount: detail.discount || 0,
    });

    toast.success(`${quantity} ${detail.name}(s) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 transition-all duration-300 relative">
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition text-lg font-semibold"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Product Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image with Thumbnails */}
          <div className="flex flex-col items-center">
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src={selectedImage} alt={detail.name} className="w-full h-96 object-cover rounded-lg" />
            </div>

            {/* Thumbnails */}
            {detail.images && detail.images.length > 0 && (
              <div className="flex gap-4 mt-4">
                {detail.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${detail.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform transform hover:scale-110 ${
                      selectedImage === img ? "border-2 border-blue-500" : "border border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{detail.name}</h1>
              {detail.discount ? (
                <p className="text-2xl font-semibold mt-2">
                  <span className="text-red-600">₹{discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through ml-2">₹{detail.price}</span>
                  <span className="text-green-600 ml-2">({detail.discount}% OFF)</span>
                </p>
              ) : (
                <p className="text-2xl font-semibold text-indigo-600 mt-2">₹{detail.price}</p>
              )}
              <p className="text-gray-700 mt-4 leading-relaxed">{detail.description}</p>
              <p className={`mt-2 font-semibold ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
                {isOutOfStock ? "Out of Stock" : `In Stock: ${detail.stock}`}
              </p>
            </div>

            {/* Quantity & Cart Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex gap-4 items-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 w-12 h-12 text-2xl font-bold rounded-full flex items-center justify-center transition active:scale-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleMinusQuantity}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="bg-gray-200 w-14 h-12 text-2xl font-bold flex items-center justify-center rounded-lg shadow-inner">
                  {quantity}
                </span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 w-12 h-12 text-2xl font-bold rounded-full flex items-center justify-center transition active:scale-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handlePlusQuantity}
                  disabled={quantity >= detail.stock}
                >
                  +
                </button>
              </div>

              <button
                className={`px-8 py-4 rounded-xl shadow-lg text-lg font-semibold tracking-wide transform transition-all ${
                  isOutOfStock
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500 active:scale-95 hover:scale-105"
                }`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {isOutOfStock ? "Out of Stock" : "🛒 Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fer_Detail;
