import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        Welcome to <span className="text-yellow-300">Our E-Commerce Store</span>
      </h1>
      <p className="text-lg max-w-2xl text-center mb-8">
        Discover amazing products and unbeatable prices! Shop now to experience the best deals on your favorite items.
      </p>
      <div className="flex space-x-4">
        <Link href="/products">
          <button className="bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition">
            Browse Products
          </button>
        </Link>
        <Link href="/cart">
          <button className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-800 transform hover:scale-105 transition">
            View Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;