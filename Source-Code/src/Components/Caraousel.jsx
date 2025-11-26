import React, { useState, useEffect } from 'react'

export default function HeroCarousel() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80',
      heading: 'Build Your Dream Website',
      subtext: 'Fast • Modern • Responsive'
    },
    {
      image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=80',
      heading: 'React + Vite + Tailwind',
      subtext: 'The perfect tech stack for speed'
    },
    {
      image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=80',
      heading: 'Bring Ideas to Life',
      subtext: 'Start building something amazing today'
    },
  ]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt="Slide"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {slide.heading}
            </h1>
            <p className="mt-4 text-lg md:text-2xl text-pink-300 drop-shadow-md">
              {slide.subtext}
            </p>
          </div>
        </div>
      ))}

      {/* Left button */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        &#8592;
      </button>

      {/* Right button */}
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${current === idx ? 'bg-pink-500' : 'bg-white/60'}`}
          ></button>
        ))}
      </div>
    </section>
  )
}
