"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import "./carousel.css";

export default function ReviewImages({ images }: { images?: string[] }) {
  const [emblaRef] = useEmblaCarousel();

  if (!images) return;

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div key={index} className="embla__slide">
              <Image
                key={index}
                src={image}
                alt="Review Image"
                layout="fill"
                objectFit="cover"
                onError={() => "/images/no-image.svg"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
