import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-toastify";

const BookSlider = ({ books }) => {
    const onAddToCart=(book)=>{
        toast.success('Added to cart !');
    }
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500 }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 mb-10">
           
            <div className="overflow-hidden rounded-xl">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-56 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

           
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {book.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                by {book.writer}
              </p>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-indigo-600">
                  ₹{book.price}
                </p>

                <button
                  onClick={() => onAddToCart(book)}
                  className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BookSlider;