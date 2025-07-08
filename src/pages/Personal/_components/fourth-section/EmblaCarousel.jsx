import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dataImg from '../../../../assets/images/dataLatest.jpg';
import designImg from '../../../../assets/images/design.jpg';
import transferImg from '../../../../assets/images/transfer.jpg';
import securityImg from '../../../../assets/images/security.jpg';

const slides = [
  {
    id: 1,
    title: 'COST-EFFECTIVE TRANSACTIONS',
    text: 'Enjoy the advantage of low fees and transparent pricing structures. Payina app provides cost-effective solutions for sending, receiving, and managing your money, maximizing your financial efficiency.',
    color: '#000',
    image: dataImg,
  },
  {
    id: 2,
    title: 'USER-FRIENDLY INTERFACE',
    text: 'Experience a seamless and intuitive platform designed with simplicity in mind. Payina is easy to navigate, making financial management a breeze for users of all levels.',
    color: '#000',
    image: designImg,
  },
  {
    id: 3,
    title: 'EXPERIENCE UNPARALLELED SPEED',
    text: `Instantaneous transfers ensure swift access to your funds, providing the efficiency needed in today's fast-paced financial landscape for seamless and timely transactions.`,
    color: '#000',
    image: transferImg,
  },
  {
    id: 4,
    title: 'SECURITY ASSURANCE',
    text: 'Trust in robust security measures that safeguard your financial transactions. Payina prioritizes the protection of your data through advanced encryption and authentication protocols.',
    color: '#000',
    image: securityImg,
  },
];

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setPrevEnabled(emblaApi.canScrollPrev());
      setNextEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative max-w-6xl mx-auto px-4 md:px-6">
      {/* Carousel */}
      <div className="overflow-hidden rounded-xl shadow-lg" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide) => (
            <motion.div
              key={slide.id}
              className="h-full flex flex-col embla__slide items-center justify-start p-6 rounded-lg shadow"
              style={{
                backgroundColor: slide.color,
                flex: '0 0 100%', // Default: 1 per view
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}>
              <img
                src={slide.image}
                alt={slide.text}
                className="max-h-[400px] object-contain rounded-lg shadow-md mb-4"
              />
              <h1 className="md:text-2xl font-bold text-center text-white">{slide.title}</h1>
              <h3 className="md:text-xl md:font-semibold text-center text-white">{slide.text}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={scrollPrev}
        disabled={!prevEnabled}
        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow disabled:opacity-30 z-10">
        <ChevronLeft size={24} />
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        disabled={!nextEnabled}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow disabled:opacity-30 z-10">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              selectedIndex === index ? 'bg-blue-600' : 'bg-stone-400'
            }`}></button>
        ))}
      </div>

      {/* Responsive styles via Tailwind */}
      <style>
        {`
        @media (min-width: 768px) {
          .embla__slide {
            flex: 0 0 50% !important;
          }
        }
      `}
      </style>
    </div>
  );
}
