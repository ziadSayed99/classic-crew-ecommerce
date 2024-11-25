import { useState } from "react";
import faqImage from "../assets/images/banners/faq.webp";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const accordionData = [
    {
      title: "How to create an account?",
      content:
        "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.",
    },
    {
      title: "Have any trust issue?",
      content:
        "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
    },
    {
      title: "How can I reset my password?",
      content:
        "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
    },
    {
      title: "What is the payment process?",
      content:
        "Our focus on providing robust and user-friendly content management capabilities ensures that you can manage your content with confidence, and achieve your content marketing goals with ease.",
    },
  ];

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? undefined : index);
  };
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <section className="py-24 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
            <div className="w-full lg:w-1/2">
              <img
                src={faqImage}
                alt="FAQ section"
                className="w-full rounded-xl object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-xl">
                <div className="mb-6 lg:mb-16">
                  <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                    Looking for answers?
                  </h2>
                </div>
                <div className="accordion-group">
                  {accordionData.map((item, index) => (
                    <div
                      key={index}
                      className={`accordion py-8 border-b border-solid border-gray-200 ${
                        activeIndex === index ? "active" : ""
                      }`}
                    >
                      <button
                        className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                        onClick={() => handleAccordionClick(index)}
                      >
                        <h5>{item.title}</h5>
                        <svg
                          className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 ${
                            activeIndex === index ? "rotate-180" : ""
                          }`}
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`accordion-content w-full px-0 overflow-hidden transition-all duration-500 ${
                          activeIndex === index ? "max-h-screen" : "max-h-0"
                        }`}
                        style={{
                          maxHeight: activeIndex === index ? "200px" : "0",
                        }}
                      >
                        <p className="text-base font-normal text-gray-600">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Faq;
