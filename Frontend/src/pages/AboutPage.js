import React from "react";
import Footer from '../components/StyledComponents/Footer';

function AboutPage() {
    return (
        <div>
            {/* About Us Section */}
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <header className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            About Us
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Welcome to DMart, your go-to online store for all your shopping needs! Founded with a mission to provide a seamless and enjoyable shopping experience, we offer a wide range of products, from the latest fashion trends to everyday essentials. Whether you're looking for electronics, home appliances, beauty products, groceries, or anything in between, DMart has you covered.
                        </p>
                    </header>
                </div>
            </section>

            
            {/* Background Image Section */}
<section className="relative w-full">
  <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
    <div 
      className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg relative" 
      style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=996&t=st=1728640536~exp=1728641136~hmac=6200d6bb4ad06aa9cd68da4ed320c4a359863ebc20a27a4148ec74aa49c5e0e6)' }}
    >
      {/* Overlay for darker background effect */}
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>

      {/* Centered text on top of the image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl text-center">
          Elevate Your Shopping Experience <br /> With DMart
        </h2>
      </div>
    </div>
  </div>
</section>


            {/* Mission and Vision Section */}
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Our Mission
                            </h3>
                            <p className="mt-4 text-gray-600">
                                At DMart, our mission is to provide a seamless, convenient, and affordable shopping experience for every customer. We strive to offer a wide variety of high-quality products at competitive prices while maintaining exceptional service and ensuring the satisfaction of each customer.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Our Vision
                            </h3>
                            <p className="mt-4 text-gray-600">
                                At DMart, we believe in making shopping easier, more accessible, and more affordable for everyone. Our vision is to create a world where quality products are available at unbeatable prices, all while ensuring convenience and exceptional customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Trusted by eCommerce Businesses
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            We’re more than just a store – we’re a community of shoppers who value quality, affordability, and convenience. Follow us on social media to stay updated on the latest products, exclusive deals, and shopping tips.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:divide-x sm:divide-gray-200">
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-blue-600">RS. 4.8m</p>
                            <p className="mt-2 text-lg text-gray-500">Total Sales</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-blue-600">100+</p>
                            <p className="mt-2 text-lg text-gray-500">Products</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-blue-600">1000+</p>
                            <p className="mt-2 text-lg text-gray-500">Loyalty Customers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default AboutPage;
