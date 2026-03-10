import React from 'react';
import BookSlider from './BookSlider';
import books from './book';

const BestSeller = () => {
  return (
    <section className="w-full py-16 from-amber-50 to-white">
      <div className="w-[75%] max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-amber-600 font-semibold text-sm tracking-wider uppercase">
              Top Picks
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2 font-serif">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600 mt-2 font-light">
              Read What Millions Have Loved!
            </p>
          </div>
          
          <button className="hidden md:flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors group">
            View All Books
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Slider Section */}
        <div className="relative">
          <BookSlider books={books} />
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center mt-8">
          <button className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium transition-colors">
            View All Books
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;