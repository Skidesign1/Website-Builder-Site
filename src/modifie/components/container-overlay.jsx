import { GripVertical } from "lucide-react"
import sidebarComponents from "./sidebar/sidebar-components"



export function ContainerOverlay({ title, component }) {
  // Find the component to render
  const componentToRender = component ? sidebarComponents.find((c) => c.id === component.componentId) : null

  return (
    <div className="border bg-card shadow-md w-full opacity-90">
      <div className="flex items-center p-2 border-b">
        <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{title}</span>
      </div>

      <div className="w-full">
        {componentToRender ? (
          <div className="p-1">{componentToRender.component}</div>
        ) : (
          <div className="flex h-[100px] items-center justify-center text-sm text-muted-foreground p-4">
            Empty Container
          </div>
        )}
      </div>
    </div>
  )
}

