import { myImage } from "../../assets/assets";
const ImageComponent = () => {
    return (
        <div className="flex justify-center items-center">
            <img src={myImage} alt={myImage} className="rounded-lg shadow-md" />
        </div>
    );
};

export default ImageComponent;
