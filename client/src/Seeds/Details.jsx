import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./products";
import { useCart } from "./Cart";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart = [] } = useCart();
  const [selectedImage, setSelectedImage] = useState("");

  const product = products.find((item) => item.slug === slug);

  useEffect(() => {
    if (!product) {
      navigate("/");
    } else {
      setSelectedImage(product.image);
    }
  }, [product, navigate]);

  if (!product) return <p className="text-center text-gray-500">Loading product details...</p>;

  const isOutOfStock = product.stock === 0;
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  const updateQuantity = (amount) => setQuantity((prev) => Math.max(1, Math.min(prev + amount, product.stock)));

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const cartItem = cart.find((item) => item.productId === product.id);
    const totalQuantity = (cartItem ? cartItem.quantity : 0) + quantity;

    if (totalQuantity > product.stock) {
      toast.warn(`Only ${product.stock} items available in stock!`);
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: discountedPrice,
      originalPrice: product.price,
      image: product.image,
      quantity,
      discount: product.discount || 0,
    });

    toast.success(`${quantity} ${product.name}(s) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-yellow-200 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-8 relative border border-green-300">
        <button className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-900" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <h2 className="text-4xl font-extrabold text-center mb-8 text-green-900">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <img src={selectedImage} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg border border-green-300" />
            {product.images?.length > 0 && (
              <div className="flex gap-4 mt-4">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105 border-2 ${selectedImage === img ? "border-green-500" : "border-gray-300"}`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-green-900">{product.name}</h1>
              <p className="text-2xl font-semibold mt-2">
                <span className={product.discount ? "text-red-600" : "text-green-700"}>₹{discountedPrice.toFixed(2)}</span>
                {product.discount && (
                  <>
                    <span className="text-gray-500 line-through ml-2">₹{product.price}</span>
                    <span className="text-green-600 ml-2">({product.discount}% OFF)</span>
                  </>
                )}
              </p>
              <p className="text-gray-700 mt-4">{product.description}</p>
              <p className={`mt-2 font-semibold ${isOutOfStock ? "text-red-600" : "text-green-600"}`}>
                {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex gap-4 items-center">
                <button
                  className="bg-green-300 hover:bg-green-400 w-12 h-12 text-2xl font-bold rounded-full flex items-center justify-center"
                  onClick={() => updateQuantity(-1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="bg-green-200 w-14 h-12 text-2xl font-bold flex items-center justify-center rounded-lg">
                  {quantity}
                </span>
                <button
                  className="bg-green-300 hover:bg-green-400 w-12 h-12 text-2xl font-bold rounded-full flex items-center justify-center"
                  onClick={() => updateQuantity(1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                className={`px-8 py-4 rounded-xl shadow-lg text-lg font-semibold tracking-wide transition-all ${
                  isOutOfStock ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-500"
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

export default Detail;
