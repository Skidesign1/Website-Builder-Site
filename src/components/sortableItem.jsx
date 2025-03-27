import { useSortable } from "@dnd-kit/sortable";
import Container from "./container";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ container, isOnCanvas, deleteContainer }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: container.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        zIndex: 1000,
        opacity: isDragging ? 1 : 1,
        transition: isDragging ? "none" : "transform",
        pointerEvents: isDragging ? "none" : "auto",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="cursor-grabbing" style={{ pointerEvents: "auto" }}>
                <Container id={container.id} isOnCanvas={isOnCanvas} isDragging={isDragging} deleteContainer={deleteContainer} />
            </div>
        </div>
    );
};

export default SortableItem