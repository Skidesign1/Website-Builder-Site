export const ShoppingCart = () => {
    return (
        <div className="p-4 bg-white shadow-md max-w-[fit-content] mt-4">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            <ul>
                <li className="flex justify-between mt-2">
                    <span>Product 1</span> <button className="text-red-500">Remove</button>
                </li>
                <li className="flex justify-between mt-2">
                    <span>Product 2</span> <button className="text-red-500">Remove</button>
                </li>
            </ul>
        </div>
    );
};