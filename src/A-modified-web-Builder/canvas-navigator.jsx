
import { Eye } from "lucide-react";


function CanvasNavigator({
  containers,
  onNavigateTo,
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium mb-2">Canvas Components</h3>

      {containers.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No components on canvas yet
        </p>
      ) : (
        containers.map((container) => (
          <div
            key={container.id.toString()}
            className="flex items-center justify-between rounded-md border p-2 text-sm"
          >
            <div>
              <div className="font-medium">{container.title}</div>
              {container.component ? (
                <div className="text-xs text-muted-foreground">
                  {container.component.label}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic">
                  Empty
                </div>
              )}
            </div>
            <button
              onClick={() => onNavigateTo(container.id.toString())}
              className="ml-2 rounded-full p-1 hover:bg-muted"
              title="Focus on this container"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default CanvasNavigator
