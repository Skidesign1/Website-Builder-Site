const Container = ({ id, isOnCanvas, deleteContainer }) => {
    return (
        <div className="relative cursor-move p-4 bg-gray-200 my-1 shadow-md min-h-[100px]">
            <div className="min-h-[100px] text-center border-2 border-dashed border-gray-400 rounded-md p-2">
                {isOnCanvas ? 'Drag Component here' : "Drag container to the canvas"}
            </div>
            {/* {isOnCanvas && (
                <button
                    className={`absolute ${isOnCanvas}  top-1 right-1 bg-red-500 text-white px-2 py-1 rounded`}
                    onClick={() => deleteContainer(id)}
                >
                    ✖
                </button>
            )} */}
        </div>
    );
};

export default Container;
