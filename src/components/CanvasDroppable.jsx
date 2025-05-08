export function CanvasDroppable({
    containers,
    overIndex,
    isDraggingNew,
    activeDroppableId,
    onDeleteContainer,
    onDeleteComponent,
    canvasSize, // Add canvasSize prop
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: "canvas-droppable",
        data: {
            accepts: "container",
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex-1 flex flex-col m-auto no-scrollbar overflow-auto",
                isOver && containers.length === 0 && "bg-muted/20"
            )}
            style={{
                width: `${canvasSize[0]}px`, // Apply width from canvasSize
                height: `${canvasSize[1]}px`, // Apply height from canvasSize
            }}
        >
            <div className="flex-1 min-h-[50vh] w-full">
                {/* Sortable containers */}
                <div className="flex ma-h-[100vh] pb-[100%] flex-col w-full max-w-full mx-auto">
                    <SortableContext items={containers.map((container) => container.id)} strategy={verticalListSortingStrategy}>
                        {containers.map((container, index) => (
                            <div key={container.id} className="relative w-full">
                                {isDraggingNew && overIndex === index && (
                                    <div className="w-full rounded-none border-2 border-dashed border-primary bg-primary/10" />
                                )}
                                <SortableContainer
                                    id={container.id}
                                    title={container.title}
                                    component={container.component}
                                    isOver={activeDroppableId === `droppable-${container.id}`}
                                    onDeleteContainer={() => onDeleteContainer(container.id)}
                                    onDeleteComponent={() => onDeleteComponent(container.id)}
                                />
                            </div>
                        ))}
                        {isDraggingNew && overIndex === containers.length && (
                            <div className="h-16 w-full rounded-none border-2 border-dashed border-primary bg-primary/10" />
                        )}
                    </SortableContext>
                    {containers.length === 0 && (
                        <div className="flex h-[calc(100vh-150px)] w-full items-center justify-center bg-muted/30 p-8 text-muted-foreground">
                            Drag container here to add to canvas
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
