import heroImage from "../assets/images/banners/hero.jpg";

function HeroSection() {
  return (
    <section
      className=" bg-cover bg-no-repeat bg-center-bottom sm:bg-top md:bg-center lg:bg-top"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0)),
        url(${heroImage})
      `,
        backgroundSize: "cover", // Adjusts the size of the image to cover the section
        backgroundPosition: "top center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
      }}
    >
      <div className="grid max-w-screen-xl px-4 py-20 lg:gap-8 xl:gap-0 lg:py-36 lg:grid-cols-12  sm:grid-cols-12">
        <div className="lg:col-span-4 md:col-span-6">
          <blockquote className="text-4xl italic font-semibold text-gray-900 dark:text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl lg:ml-32 mt-36 mb-32">
              "Style for Every Generation ---- <br /> Where Timeless Meets
              Playful."
            </h1>
          </blockquote>

          <button className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-white-300 rounded-full   hover:bg-gray-100  dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black dark:hover:border-black lg:ml-32">
            Check It Out
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
