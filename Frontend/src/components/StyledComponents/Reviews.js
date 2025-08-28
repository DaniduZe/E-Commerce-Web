import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import React, { useEffect } from "react";

function Reviews() {
  useEffect(() => {
    const slider = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 2.5,
            spacing: 32,
          },
        },
      },
    });

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");

    keenSliderPrevious.addEventListener("click", () => slider.prev());
    keenSliderNext.addEventListener("click", () => slider.next());

    // Cleanup
    return () => {
      slider.destroy();
    };
  }, []);

  const reviews = [
    {
      title: "Amazing Shopping Experience!",
      content: "DMart has completely transformed the way I shop! The deals are unbeatable, and the products are of top-notch quality. Highly recommend!",
      author: "Sophia L.",
    },
    {
      title: "Unmatched Variety and Quality",
      content: "I’m impressed by the variety of products and the exclusive discounts. The delivery was slightly delayed, but the quality made up for it!",
      author: "Anika T.",
    },
    {
      title: "User-Friendly and Reliable",
      content: "The new look of the website is so inviting! The smooth navigation and exclusive deals make shopping here a pleasure. Five stars!",
      author: "Ethan P.",
    },
    {
      title: "Highly Recommend!",
      content: "I love how DMart takes care of its customers! Excellent products, great customer support, and amazing prices. I’m hooked!",
      author: "Emma S.",
    },
    {
      title: "Fantastic Experience!",
      content: "From groceries to electronics, DMart has it all! I can’t stop recommending it to friends and family. Keep up the good work!",
      author: "Isabella C.",
    },
  ];

  return (
    <section className="bg-white mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="max-w-7xl items-end justify-between sm:flex sm:pe-6 lg:pe-8">
          <h2 className="max-w-xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Read trusted reviews from our customers
          </h2>

          <div className="mt-8 flex gap-4 lg:mt-0">
            <button
              aria-label="Previous slide"
              id="keen-slider-previous"
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              id="keen-slider-next"
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="-mx-6 mt-8 lg:col-span-2 lg:mx-0">
          <div id="keen-slider" className="keen-slider">
            {reviews.map((review, index) => (
              <div key={index} className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex gap-0.5 text-green-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="size-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                        {review.title}
                      </p>
                      <p className="mt-4 leading-relaxed text-gray-700">
                        {review.content}
                      </p>
                    </div>
                  </div>

                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                    &mdash; {review.author}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
