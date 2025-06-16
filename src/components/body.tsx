import men from "../assets/images/banners/menhome.jpg";
import kids from "../assets/images/banners/kids.jpg";
import ads from "../assets/images/banners/swiper.jpg";
import cash from "../cash.png";
import delivery from "../delivery.png";
import cs from "../cs.png";
import { Link } from "react-router-dom";

function Body() {
  const callouts = [
    {
      name: "Men",
      description: "Discover newest men collection",
      imageSrc: men,
      imageAlt: "",
      href: "/men",
    },
    {
      name: "Kids",
      description: "Fashion with style",
      imageSrc: kids,
      imageAlt: "",
      href: "/men",
    },
  ];

  return (
    <div>
      <div className="bg-white">
        <h2 className="text-xl lg:text-4xl  font-playfair text-black text-center mt-5">
          Shop by Category.
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Discover our carefully curated collections
        </p>
        <div className="grid sm:grid-cols-2 gap-4 lg:px-36">
          {callouts.map((callout) => (
            <Link
              to={`/products?name=${callout.name}`}
              key={callout.name}
              className="group relative"
            >
              <div className="w-full flex flex-col items-center justify-center">
                <div className="relative w-full flex justify-center overflow-hidden">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    style={{
                      height: "550px",
                    }}
                  />
                  {/* Black overlay with opacity */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500 ease-in-out">
                    
                  </div>

                  {/* Text appearing on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                    <p className="text-white text-2xl font-semibold">
                      {callout.name}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  {" "}
                  {/* Center the text as well */}
                  <p className="text-base font-semibold text-white mt-3 mb-5">
                    {callout.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center bg-gray-100 py-16">
        <div className="flex flex-row lg:gap-x-96 gap-x-12 flex-wrap justify-center">
          <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white p-4 rounded-full shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
              <img
                className="h-14 w-14 lg:w-20 lg:h-20"
                src={cash}
                alt="cash"
              />
            </div>
            <p className="text-gray-700 font-medium text-lg">Cash On Delivery</p>
            <p className="text-gray-500 text-sm mt-1">Pay when you receive</p>
          </div>
          <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white p-4 rounded-full shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
              <img
                className="h-14 w-14 lg:w-20 lg:h-20"
                src={delivery}
                alt="delivery"
              />
            </div>
            <p className="text-gray-700 font-medium text-lg">Fast Delivery</p>
            <p className="text-gray-500 text-sm mt-1">Quick & reliable shipping</p>
          </div>
          <div className="flex flex-col items-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white p-4 rounded-full shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
              <img
                className="h-14 w-14 lg:w-20 lg:h-20"
                src={cs}
                alt="customer service"
              />
            </div>
            <p className="text-gray-700 font-medium text-lg">Customer Service</p>
            <p className="text-gray-500 text-sm mt-1">24/7 Support Available</p>
          </div>
        </div>
      </div>
      <section
        className="relative bg-cover bg-no-repeat bg-center mx-4 lg:mx-10 mt-10 rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
            url(${ads})
          `,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <blockquote className="text-4xl italic font-semibold text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-wide text-center lg:text-left">
                UP TO 50% OFF <br /> 
                <span className="text-yellow-400 block mt-2">for all collections</span>
              </h1>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Body;
