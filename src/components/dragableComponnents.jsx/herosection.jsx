const HeroSection = () => {
    return (
        <section className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Empower Your Business with Innovation
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Discover powerful solutions designed to drive growth and efficiency.
                </p>
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <button className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200 transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border border-white rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
                <img
                    src="https://source.unsplash.com/600x400/?technology,business"
                    alt="Hero Section"
                    className="rounded-lg shadow-lg w-full md:w-4/5"
                />
            </div>
        </section>
    );
};

export default HeroSection;