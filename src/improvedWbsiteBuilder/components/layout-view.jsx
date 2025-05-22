
import { Folder, File, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export function LayoutView({ containers, activePage, onDeleteContainer, onDeleteComponent }) {
  return (
    <div className="p-1">
      <h3 className="text-sm font-medium mb-4">Page Structure</h3>

      <div className="border rounded-md p-2 bg-muted/20">
        <div className="flex items-center mb-3">
          <Folder className="h-4 w-4 text-primary mr-2" />
          <span className="font-medium">{activePage.name} Page</span>
          <span className="text-xs text-muted-foreground ml-2">({activePage.path})</span>
        </div>

        {containers.length === 0 ? (
          <div className="pl-2 text-muted-foreground text-sm">No containers on this page</div>
        ) : (
          <ul className="space-y-2 pl-1">
            {containers.map((container) => (
              <li key={container.id} className="border-l-2 pl-1 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Folder className="h-4 w-4 text-orange-500 mr-2" />
                    <span className="text-sm">{container.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-red-500/20 hover:text-red-400"
                    onClick={() => onDeleteContainer(container.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {container.component ? (
                  <div className="mt-1 pl-2 flex items-center  justify-between ">
                    <div className="flex items-center">
                      <File className="h-3 w-3 text-blue-500 mr-2" />
                      <span className="text-xs">{container.component.label}</span>
                      <span className="text-xs text-muted-foreground ml-1">({container.component.type})</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-red-500/20 hover:text-red-400"
                      onClick={() => onDeleteComponent(container.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-1 pl-4 text-xs text-muted-foreground">Empty container</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
