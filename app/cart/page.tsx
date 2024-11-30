'use client';

import { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<
    { id: number; name: string; price: number; quantity: number }[]
  >([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: increment
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
          }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 text-center py-4 border-b">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty!</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, false)}
                      className="bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, true)}
                      className="bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Total:</h3>
              <span className="text-xl font-bold text-gray-900">${calculateTotal()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;