import React from "react";

function Body() {
    const products = [
        { id: 1, name: "Product 1", price: 19.99, image: "https://via.placeholder.com/200" },
        { id: 2, name: "Product 2", price: 29.99, image: "https://via.placeholder.com/200" },
        { id: 3, name: "Product 3", price: 39.99, image: "https://via.placeholder.com/200" },
        { id: 4, name: "Product 4", price: 49.99, image: "https://via.placeholder.com/200" },
        { id: 5, name: "Product 5", price: 59.99, image: "https://via.placeholder.com/200" },
        { id: 6, name: "Product 6", price: 69.99, image: "https://via.placeholder.com/200" },
    ];

    return (
        <div className="bg-gray-100 min-w-[50vw]  max-h-screen">
            {/* Main Content */}
            <main className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                                    <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    );
}

export default Body;
