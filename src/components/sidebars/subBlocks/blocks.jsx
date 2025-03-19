import React, { useState } from "react";

const slides = [
    {
        title: "Boost Your Business",
        subtitle: "With Expert Solutions",
        image: "/path-to-image1.jpg",
    },
    {
        title: "Collaborate Efficiently",
        subtitle: "Teamwork at its best",
        image: "/path-to-image2.jpg",
    },
    {
        title: "Online Training Programs",
        subtitle: "Enhance your skills anywhere",
        image: "/path-to-image3.jpg",
        buttonText: "Get Started",
    },
    {
        title: "Boost Your Business",
        subtitle: "With Expert Solutions",
        image: "/path-to-image1.jpg",
        buttonText: "Learn More",
    },
    {
        title: "Collaborate Efficiently",
        subtitle: "Teamwork at its best",
        image: "/path-to-image2.jpg",
    },
    {
        title: "Online Training Programs",
        subtitle: "Enhance your skills anywhere",
        image: "/path-to-image3.jpg",
        buttonText: "Get Started",
    },
    {
        title: "Boost Your Business",
        subtitle: "With Expert Solutions",
        image: "/path-to-image1.jpg",
        buttonText: "Learn More",
    },
    {
        title: "Collaborate Efficiently",
        subtitle: "Teamwork at its best",
        image: "/path-to-image2.jpg",
    },
    {
        title: "Online Training Programs",
        subtitle: "Enhance your skills anywhere",
        image: "/path-to-image3.jpg",
        buttonText: "Get Started",
    },
];

const Blocks = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="flex p-2">
            <div className="bg-gray-100 p-2 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Blocks</h2>
                <div className="space-y-4">
                    {slides.map((slide, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <span className="font-bold text-lg">{index + 1}</span>
                            <div
                                className={`p-2 border rounded cursor-pointer ${currentSlide === index ? "border-blue-600" : "border-gray-300"}`}
                                onClick={() => setCurrentSlide(index)}
                            >
                                <img src={slide.image} alt={slide.title} className="h-16 object-cover rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blocks;
