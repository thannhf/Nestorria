import React, { useState } from "react";

const PropertyImages = ({ property }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const imageCaptions = [
    {
      heading: "Front view",
      desc: "Experience a stunning first impression with elegant curb appeal.",
    },
    {
      heading: "Living Area",
      desc: "Spacious interiors designed for comfort and style.",
    },
    {
      heading: "Master Bedroom",
      desc: "A private retreat featuring comfort, light, and relaxation.",
    },
    {
      heading: "Modern Kitchen",
      desc: "Fully equipped kitchen with sleek finishes and modern appliaces.",
    },
  ];

  return (
    <div className="flex max-sm:gap-1 max-md:gap-3 gap-5 h-[400px] w-full">
      {property.images.map((pImg, index) => {
        const caption = imageCaptions[index];
        const isHovered = hoveredIndex === index;

        return (
          <div
            key={index}
            className={`relative transition-all duration-500 h-[400px] overflow-hidden rounded-2xl ${
              isHovered ? "flex-grow w-full" : "max-sm:w-10 max-md:w-20 w-56"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(0)}
          >
            <img src={pImg} alt="property" className="h-full w-full object-cover object-center rounded-2xl" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                <h3 className="h3">{caption.heading}</h3>
                <h3 className="text-white/90">{caption.desc}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropertyImages;
