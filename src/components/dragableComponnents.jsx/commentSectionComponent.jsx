export const CommentSection = () => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <div className="mt-2">
                <p className="text-gray-700">John: Great product!</p>
                <p className="text-gray-700">Anna: Fast delivery!</p>
            </div>
            <input
                type="text"
                placeholder="Write a comment..."
                className="w-full mt-2 p-2 border rounded"
            />
        </div>
    );
};