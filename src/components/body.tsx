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
                    className="hover:opacity-75"
                    style={{
                      height: "550px", // Set a fixed height for all images (you can adjust this value)
                    }}
                  />
                  {/* Black overlay with opacity */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity ">
                    
                  </div>

                  {/* Text appearing on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ">
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
      <div className="flex flex-row justify-center bg-gray-300">
        <div className="flex flex-row lg:gap-x-96 mt-10 mb-10">
          <div>
            <img
              className="h-14 w-14 lg:w-20 lg:h-20"
              src={cash}
              alt="cash"
            ></img>
            <p className="text-sm mr-2">Cash On Delivery</p>
          </div>
          <div>
            <img
              className="h-14 w-14 lg:w-20 lg:h-20"
              src={delivery}
              alt="cash"
            ></img>
            <p className="text-sm">Fast Devliery</p>
          </div>
          <div>
            <img
              className="h-14 w-14 lg:w-20 lg:h-20 ml-12"
              src={cs}
              alt="cash"
            ></img>
            <p className="ml-2 text-sm">Customer Services 1698</p>
          </div>
        </div>
      </div>
      <section
        className=" bg-cover bg-no-repeat bg-center-bottom sm:bg-top md:bg-center mr-4 ml-4 lg:mr-10 lg:ml-10 mt-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0)),
            url(${ads})
          `,
          backgroundPosition: "top ", // Centers the image
          paddingBottom: "50px",
        }}
      >
        <div className="grid max-w-screen-xl px-4 py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12  sm:grid-cols-12">
          <div className="lg:col-span-12 md:col-span-6">
            <blockquote className="text-4xl italic font-semibold text-gray-900 dark:text-white">
              <h1 className="text-2xl md:text-3xl lg:text-4xl lg:ml-32 mt-40 mb-32 uppercase">
                UP TO 50% OFF <br /> for all collections{" "}
              </h1>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Body;
