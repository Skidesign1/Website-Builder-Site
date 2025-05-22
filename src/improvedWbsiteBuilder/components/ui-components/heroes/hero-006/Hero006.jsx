import React from "react";
import hero006Config from "./Hero006.config.json";

export default function Hero006({ config = hero006Config }) {
  const isCentered = config?.layout === "center";
  const bg =
    config?.background?.type === "gradient"
      ? `bg-gradient-to-r ${config.background.gradient}`
      : config?.background?.image
      ? `bg-[url('${config.background.image}')] bg-cover bg-center`
      : `bg-${config.background}`;

  if (!config) return null;

  return (
    <section
      className={`${bg} text-${config.text.color} py-${config.padding.y}`}
    >
      <div className={`max-w-7xl mx-auto px-${config.padding.x}`}>
        <div className={isCentered ? "text-center" : "text-left"}>
          {/* Badge */}
          {config.badge?.show && (
            <span
              className={`inline-block mb-4 bg-${config.badge.bgColor} text-${config.badge.textColor} px-${config.badge.padding.x} py-${config.badge.padding.y} rounded-${config.badge.rounded} text-sm font-medium`}
            >
              {config.badge.text}
            </span>
          )}

          {/* Heading */}
          <h1
            className={`text-${config.heading.size} font-${
              config.heading.weight
            } leading-tight mb-${config.spacing.between} animate-${
              config.heading.animate || "none"
            }`}
          >
            {config.heading.text}
          </h1>

          {/* Subheading */}
          <p
            className={`text-${config.subheading.size} text-${config.subheading.color} mb-${config.spacing.between}`}
          >
            {config.subheading.text}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex ${
              isCentered ? "justify-center" : "justify-start"
            } space-x-${config.cta.spacing}`}
          >
            {config.cta.buttons.map((btn, index) => (
              <a
                key={index}
                href={btn.href}
                className={`px-${btn.size.x} py-${btn.size.y} rounded-${btn.rounded} text-${btn.textColor} bg-${btn.background} hover:bg-${btn.hoverBg} font-${btn.fontWeight} transition`}
              >
                {btn.text}
              </a>
            ))}
          </div>

          {/* Image */}
          {config.image?.src && (
            <div
              className={`mt-${config.spacing.imageTop} ${
                isCentered ? "text-center" : ""
              }`}
            >
              <img
                src={config.image.src}
                alt={config.image.alt}
                className={`mx-auto w-${config.image.width} h-${config.image.height} rounded-${config.image.rounded} shadow-${config.image.shadow} object-contain`}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
