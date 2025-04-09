import { useState } from "react"
import { Pencil, Trash2, Plus, Check, X, FileText } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "../../components/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export function PageManager({ onPageChange }) {
  // Page management state
  const [pages, setPages] = useState([
    { id: "home", name: "Home", path: "/", isDefault: true },
    { id: "about", name: "About", path: "/about" },
    { id: "contact", name: "Contact", path: "/contact" },
  ])
  const [activePage, setActivePage] = useState(pages[0])
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [editPageName, setEditPageName] = useState("")
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false)
  const [newPageName, setNewPageName] = useState("")

  // Page management functions
  const handlePageSelect = (page) => {
    setActivePage(page)
    onPageChange(page.id)
  }

  const handleCreatePage = () => {
    if (newPageName.trim() === "") return

    const newId = `page-${Date.now()}`
    const newPath = `/${newPageName.toLowerCase().replace(/\s+/g, "-")}`

    const newPage = {
      id: newId,
      name: newPageName,
      path: newPath,
    }

    setPages([...pages, newPage])
    setActivePage(newPage)
    onPageChange(newId)
    setNewPageName("")
    setNewPageDialogOpen(false)
  }

  const startEditingPage = (page) => {
    if (page.isDefault) return // Don't allow editing the default page
    setIsEditingPage(true)
    setEditPageName(page.name)
  }

  const savePageEdit = () => {
    if (editPageName.trim() === "") return

    setPages(
      pages.map((page) =>
        page.id === activePage.id
          ? {
            ...page,
            name: editPageName,
            path: `/${editPageName.toLowerCase().replace(/\s+/g, "-")}`,
          }
          : page,
      ),
    )

    setActivePage({
      ...activePage,
      name: editPageName,
      path: `/${editPageName.toLowerCase().replace(/\s+/g, "-")}`,
    })

    setIsEditingPage(false)
  }

  const cancelPageEdit = () => {
    setIsEditingPage(false)
    setEditPageName(activePage.name)
  }

  const handleDeletePage = (pageId) => {
    // Don't allow deleting the default page
    if (pages.find((p) => p.id === pageId)?.isDefault) return

    const updatedPages = pages.filter((page) => page.id !== pageId)
    setPages(updatedPages)

    // If the active page was deleted, switch to the default page
    if (activePage.id === pageId) {
      const defaultPage = updatedPages.find((p) => p.isDefault) || updatedPages[0]
      setActivePage(defaultPage)
      onPageChange(defaultPage.id)
    }
  }

  return (
    <div className="flex flex-col space-y-2">
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
            onClick={() => handlePageSelect(page)}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              {activePage.id === page.id && isEditingPage ? (
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
                        handleDeletePage(page.id)
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
