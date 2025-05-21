import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock cn utility function since we can't import it
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};


interface ResponsiveImageProps {
  src: string;
  alt?: string;
  current?: boolean;
  isActive?: boolean;
}

// ResponsiveImage component for optimized image loading
const ResponsiveImage = ({ 
  src, 
  alt = "Slide image", 
  current = false,
  isActive = false
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const baseUrl = src.split('?')[0];
  
  // Parse and extract the width from the original URL if present
  const originalWidth = src.includes('w=') 
    ? parseInt(src.split('w=')[1].split('&')[0]) 
    : 1920;

  // Create various image sizes
  const imgSizes = [
    { width: 640, quality: 70 },   // Mobile
    { width: 1024, quality: 75 },  // Tablet
    { width: 1440, quality: 80 },  // Small desktop
    { width: 1920, quality: 85 },  // Large desktop
    { width: originalWidth, quality: 90 }  // Original/Max size
  ];

  // Generate srcset for responsive images
  const srcSet = imgSizes
    .map(size => {
      // Only include sizes smaller than or equal to the original
      if (size.width <= originalWidth) {
        return `${baseUrl}?q=${size.quality}&w=${size.width}&auto=format&fit=crop ${size.width}w`;
      }
      return null;
    })
    .filter(Boolean)
    .join(', ');

  // Preload upcoming slides or load current slide
  useEffect(() => {
    if (current || isActive) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
    }
  }, [src, current, isActive]);

  return (
    <div className="absolute inset-0">
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        loading={current ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const slides = [
  {
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1887&auto=format&fit=crop",
    title: "Men's Collection",
    subtitle: "Elevate your style with our premium menswear",
    cta: "Shop Men",
    link: "/category/men",
  },
  {
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1887&auto=format&fit=crop",
    title: "Kids' Essentials",
    subtitle: "Colorful and comfortable styles for the little ones",
    cta: "Explore Kids",
    link: "/category/kids",
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextToLoad, setNextToLoad] = useState((current + 1) % slides.length);

  // Preload the next slide
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    setNextToLoad(nextIndex);
  }, [current]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((current - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  // Custom Link component to replace react-router-dom Link
  const Link = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} className="no-underline text-inherit">
      {children}
    </a>
  );

  return (
    <div className="relative h-screen min-h-[500px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Replace background-image with ResponsiveImage */}
          <ResponsiveImage 
            src={slide.image} 
            alt={`${slide.title} banner`}
            current={current === index}
            isActive={index === nextToLoad}
          />
          
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-3xl md:text-7xl font-serif font-medium mb-4 text-center">
              {slide.title}
            </h2>
            <p className="text-sm md:text-xl mb-8 max-w-[14rem] md:max-w-md text-center">
              {slide.subtitle}
            </p>
            <button
              className="bg-white text-black py-2 px-4 text-sm font-medium hover:bg-white/90 animate-fade-in">
              <Link to={slide.link}>{slide.cta}</Link>
            </button>
          </div>
        </div>
      ))}
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 md:p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 w-12 rounded-full transition-all duration-300",
              current === index ? "bg-white" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;