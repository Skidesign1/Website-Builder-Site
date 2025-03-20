const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">MyShop</h1>
            <ul className="flex space-x-4">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Shop</li>
                <li className="cursor-pointer">Contact</li>
            </ul>
        </nav>
    );
};
export default Navbar