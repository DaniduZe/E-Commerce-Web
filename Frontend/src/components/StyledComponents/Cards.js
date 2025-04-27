import React from "react";

function Cards() {
    return (
      <section className="relative bg-white">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <a href="#" className="block">
          <img
            alt=""
            src="https://as1.ftcdn.net/v2/jpg/02/08/83/78/1000_F_208837881_3PqKDd2YqpDLqmLkbjDZRGg1YSbgx81r.jpg"
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">Electric Items</h3>
          <p className="mt-2 max-w-sm text-#020617">
          Discover a wide range of premium kitchen appliances including mixers, blenders, and irons to simplify your daily tasks.
          </p>
        </a>
        <a href="#" className="block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">Clothes</h3>
          <p className="mt-2 max-w-sm text-#020617">
          Shop stylish and trendy clothing collections with vibrant colors and patterns that complement every wardrobe.
          </p>
        </a>
        <a href="#" className="block">
          <img
            alt=""
            src="https://as2.ftcdn.net/v2/jpg/08/54/14/27/1000_F_854142759_CO0Y6aTgovklA2AEh7iyizs3RgqUJ9co.jpg"
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">Grocery Items</h3>
          <p className="mt-2 max-w-sm text-#020617">
          Stock up on fresh and organic groceries, from vegetables to everyday essentials, for a healthy lifestyle.
          </p>
        </a>
      </div>
      </section>
    );
}

export default Cards;