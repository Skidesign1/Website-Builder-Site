import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Container from "./container";

const SortableItem = ({ container, deleteContainer }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: container.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 200ms ease",
        opacity: isDragging ? 0.5 : 1,
        pointerEvents: isDragging ? "none" : "auto",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Container id={container.id} isOnCanvas={true} deleteContainer={deleteContainer} />
        </div>
    );
};

export default SortableItem;
