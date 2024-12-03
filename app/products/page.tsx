'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>(
    []
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [popupProduct, setPopupProduct] = useState<string>(''); // Product name for popup message
  const router = useRouter(); // For navigation to cart page

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
      if (!res.ok) {
        console.error('Failed to fetch products');
        return;
      }
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show popup when an item is added to the cart
    setPopupProduct(product.name);
    setIsPopupVisible(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Our Premium Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: { id: number; name: string; price: number, image?: string }) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50"
            >
              {/* Product Image */}
              <div className="h-64 bg-gray-200 relative group">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full transition-transform group-hover:scale-110"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold">
                    Can&apos;t Load Image
                  </span>
                )}
                <div className="absolute top-4 right-4 bg-white text-indigo-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-lg font-bold">{product.price}</span>
                </div>
              </div>
              {/* Product Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h2>
                <p className="text-gray-600 mt-2">Price: <span className="font-bold">${product.price}</span></p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup for Item Added */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center transform transition-all opacity-0 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              Item {popupProduct} added to cart!
            </h2>
            <button
              onClick={() => router.push('/cart')}
              className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition-colors"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
