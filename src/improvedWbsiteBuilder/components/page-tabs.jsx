import { useState } from "react"
import { Pencil, Trash2, Plus, Check, X, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export function PageTabs({ pages, activePage, onPageChange, onCreatePage, onRenamePage, onDeletePage }) {
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [editPageId, setEditPageId] = useState(null)
  const [editPageName, setEditPageName] = useState("")
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false)
  const [newPageName, setNewPageName] = useState("")

  const handleCreatePage = () => {
    if (newPageName.trim() === "") return
    onCreatePage(newPageName)
    setNewPageName("")
    setNewPageDialogOpen(false)
  }

  const startEditingPage = (page) => {
    if (page.isDefault) return // Don't allow editing the default page
    setIsEditingPage(true)
    setEditPageId(page.id)
    setEditPageName(page.name)
  }

  const savePageEdit = () => {
    if (editPageName.trim() === "" || !editPageId) return
    onRenamePage(editPageId, editPageName)
    setIsEditingPage(false)
    setEditPageId(null)
  }

  const cancelPageEdit = () => {
    setIsEditingPage(false)
    setEditPageId(null)
  }

  return (
    <div className="flex flex-col space-y-2 mt-6 border-t pt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Pages</h3>
        <Dialog open={newPageDialogOpen} onOpenChange={setNewPageDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#333] border-[#444] text-white">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription className="text-muted-foreground">Enter a name for your new page.</DialogDescription>
            </DialogHeader>
            <Input
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="Page name"
              className="bg-[#222] border-[#444]"
              autoFocus
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setNewPageDialogOpen(false)}
                className="border-[#444] hover:bg-[#444] hover:text-white"
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePage}>Create Page</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-1">
        {pages.map((page) => (
          <div
            key={page.id}
            className={cn(
              "flex items-center justify-between px-2 py-1.5 rounded-md group hover:bg-muted/50 cursor-pointer",
              activePage.id === page.id && "bg-primary/20",
            )}
            onClick={() => onPageChange(page)}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              {isEditingPage && editPageId === page.id ? (
                <div className="flex items-center">
                  <Input
                    value={editPageName}
                    onChange={(e) => setEditPageName(e.target.value)}
                    className="h-6 w-32 bg-[#333] border-[#555] text-white"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        savePageEdit()
                      } else if (e.key === "Escape") {
                        cancelPageEdit()
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex space-x-1 ml-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={(e) => {
                        e.stopPropagation()
                        savePageEdit()
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={(e) => {
                        e.stopPropagation()
                        cancelPageEdit()
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <span className="text-sm">{page.name}</span>
              )}
            </div>

            {!isEditingPage && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                {!page.isDefault && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditingPage(page)
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 hover:bg-red-500/20 hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeletePage(page.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
