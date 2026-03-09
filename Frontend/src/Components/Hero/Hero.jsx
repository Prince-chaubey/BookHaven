import React from "react";

const Hero = () => {
  return (
   <section className="w-full flex items-center p-5">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 md:px-12 items-center">

     
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            Discover Your Next <br />
            Favorite Book 📚
          </h1>

          <p className="mt-5 text-gray-600 text-lg max-w-lg">
            Explore thousands of books across fiction, academics,
            self-help and novels. Start your reading journey today.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-7 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
              Shop Now
            </button>

            <button className="border-2 border-blue-600 bg-white-500 text-blue-600 px-7 py-3 rounded-lg transition cursor-pointer">
              Browse Books
            </button>
          </div>
        </div>

      
        <div className="relative flex justify-center">

         
          <div className="absolute w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

         
          <div className="relative space-y-5">

            <div className="bg-white shadow-xl rounded-xl p-6 w-64">
              <h3 className="font-semibold text-blue-600">
                Bestseller
              </h3>
              <p className="text-gray-700">Atomic Habits</p>
            </div>

            <div className="bg-blue-50 shadow-xl rounded-xl p-6 w-64 ml-10">
              <h3 className="font-semibold text-blue-600">
                Fiction
              </h3>
              <p className="text-gray-700">The Alchemist</p>
            </div>

            <div className="bg-white shadow-xl rounded-xl p-6 w-64">
              <h3 className="font-semibold text-blue-600">
                Programming
              </h3>
              <p className="text-gray-700">Clean Code</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;