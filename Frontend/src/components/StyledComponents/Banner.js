import React from "react";
import BannerImage from '../assets/Banner2.png';

function Banner() {
    return (
        <section className="relative bg-white">
            <div className="mx-auto max-w-screen-xl px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 items-center">
                    {/* Image Section */}
                    <div className="relative h-72 overflow-hidden rounded-lg shadow-2xl sm:h-96 lg:order-last lg:h-full transition-transform transform hover:scale-105">
                        <img
                            alt="Shopping"
                            src={BannerImage}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col justify-center text-center lg:text-left">
                        <h2 className="text-4xl font-extrabold text-gray-800 sm:text-5xl lg:text-6xl tracking-tight leading-tight hover:text-teal-600 transition-colors duration-500 ease-in-out">
                            Welcome to DMart
                        </h2>
                        <p className="mt-6 text-gray-600 text-lg lg:text-xl leading-relaxed">
                            Discover premium products, exclusive deals, and a seamless shopping experience tailored just for you.
                        </p>
                        <button
                            className="mt-10 inline-block rounded-full bg-teal-700 px-10 py-4 text-lg font-semibold text-white shadow-lg hover:bg-teal-800 hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50"
                            onClick={() => console.log("Button Clicked")}
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
