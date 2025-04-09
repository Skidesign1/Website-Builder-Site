
import { useState } from "react"
import {
  ChevronDown,
  ChevronLeft,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  LayoutGrid,
  FileText,
  Settings,
  Minus,
  Plus,
  RefreshCw,
  ImageIcon,
  Archive,
  Code,
  User,
  Eye,
  PlusIcon,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
// import Input_ from "postcss/lib/input"
import { cn } from "../../components/lib/utils"
import { logo } from "../../assets/assets"

// Resolution presets
const resolutions = {
  "Mobile Resolutions": [
    { label: "320 x 480 — iPhone 4", size: [320, 480] },
    { label: "320 x 568 — iPhone 5/SE", size: [320, 568] },
    { label: "360 x 640 — Small Android Phones", size: [360, 640] },
    { label: "375 x 667 — iPhone 6/7/8", size: [375, 667] },
    { label: "375 x 812 — iPhone X/11/12/13", size: [375, 812] },
    { label: "360 x 740 — Samsung Galaxy S8", size: [360, 740] },
    { label: "411 x 731 — Google Pixel 2", size: [411, 731] },
    { label: "412 x 869 — Google Pixel 4", size: [412, 869] },
    { label: "412 x 915 — Samsung Galaxy S20 Ultra", size: [412, 915] },
    { label: "414 x 736 — iPhone 8 Plus", size: [414, 736] },
    { label: "414 x 896 — iPhone XR", size: [414, 896] },
  ],
  "Tablet Resolutions": [
    { label: "600 x 960 — Small Tablets (Generic)", size: [600, 960] },
    { label: '768 x 1024 — iPad Mini / iPad (9.7")', size: [768, 1024] },
    { label: "800 x 1280 — Samsung Galaxy Tab", size: [800, 1280] },
    { label: '834 x 1194 — iPad Pro 11"', size: [834, 1194] },
    { label: "912 x 1368 — Microsoft Surface Pro 7", size: [912, 1368] },
    { label: '1024 x 1366 — iPad Pro 12.9"', size: [1024, 1366] },
  ],
  "Laptop Resolutions": [
    { label: "1280 x 720 — Standard HD Laptops", size: [1280, 720] },
    { label: '1280 x 800 — MacBook Air 11"', size: [1280, 800] },
    { label: "1366 x 768 — Chromebook / Standard Laptop", size: [1366, 768] },
    { label: '1440 x 900 — MacBook Air 13"', size: [1440, 900] },
    { label: "1920 x 1080 — Dell XPS 13 / Full HD Laptops", size: [1920, 1080] },
    { label: '2560 x 1600 — MacBook Pro 13"', size: [2560, 1600] },
    { label: '3024 x 1964 — MacBook Pro 14"', size: [3024, 1964] },
    { label: "3840 x 2160 — 4K High-end Laptops", size: [3840, 2160] },
  ],
  "Desktop Resolutions": [
    { label: "1366 x 768 — Small Desktop Monitors", size: [1366, 768] },
    { label: "1600 x 900 — Medium Desktop Monitors", size: [1600, 900] },
    { label: "1920 x 1080 — Full HD Monitors", size: [1920, 1080] },
    { label: "2560 x 1440 — Quad HD Monitors", size: [2560, 1440] },
    { label: "3440 x 1440 — Ultra-wide Monitors", size: [3440, 1440] },
    { label: "3840 x 2160 — 4K UHD Monitors", size: [3840, 2160] },
    { label: "5120 x 1440 — Super Ultra-wide Monitors", size: [5120, 1440] },
    { label: "5120 x 2880 — 5K Display Monitors", size: [5120, 2880] },
  ],
}

export default function WebsiteBuilderNavbar({
  pages,
  activePage,
  onPageChange,
  onCreatePage,
  onRenamePage,
  onDeletePage,
}) {
  const [activeDevice, setActiveDevice] = useState("desktop")
  const [selectedResolution, setSelectedResolution] = useState("")
  const [viewSize, setViewSize] = useState([1920, 1080])
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [editPageName, setEditPageName] = useState("")
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false)
  const [newPageName, setNewPageName] = useState("")

  // Handle device view changes
  const handleChangeView = (size) => {
    setViewSize(size)
    // This would typically update a parent component's state
    // to change the preview size
  }

  // Page management functions
  const handlePageSelect = (page) => {
    onPageChange(page)
  }

  const handleCreatePage = () => {
    if (newPageName.trim() === "") return
    onCreatePage(newPageName)
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
    onRenamePage(activePage.id, editPageName)
    setIsEditingPage(false)
  }

  const cancelPageEdit = () => {
    setIsEditingPage(false)
    setEditPageName(activePage.name)
  }

  const handleDeletePage = (pageId) => {
    // Don't allow deleting the default page
    if (pages.find((p) => p.id === pageId)?.isDefault) return
    onDeletePage(pageId)
  }

  // Other toolbar functions
  const handleReset = () => {
    setActiveDevice("desktop")
    setSelectedResolution("")
    setViewSize([1920, 1080])
  }

  const handleResolutionChange = (value) => {
    setSelectedResolution(value)
    const size = value.split("x").map(Number)
    handleChangeView(size)
  }

  return (
    <div className="flex items-center justify-between w-full h-12 bg-[#2d2d2d] text-white border-b border-[#222]">
      {/* Left section */}
      <div className="flex items-center space-x-2">
        <Link className="overflow-x-hidden h-40 w-40 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={logo} alt="Logo" />
        </Link>

        <div className="flex items-center space-x-5 text-sm">
          <div className="flex items-center space-x-1">
            <ChevronLeft className="w-4 h-4" />
            <span>My Sites</span>
          </div>

          {/* Page selector dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-1 px-2 py-0.5 bg-[#444] rounded cursor-pointer">
                <span>
                  Page:{" "}
                  {isEditingPage ? (
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
                        e.stopPropagation()
                      }}
                      autoFocus
                    />
                  ) : (
                    activePage.name
                  )}
                </span>
                {isEditingPage ? (
                  <div className="flex space-x-1">
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
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-[#333] border-[#444] text-white">
              {pages.map((page) => (
                <DropdownMenuItem
                  key={page.id}
                  className={cn(
                    "flex items-center cursor-pointer justify-between group",
                    activePage.id === page.id && "bg-primary/20",
                  )}
                  onSelect={() => handlePageSelect(page)}
                >
                  <span>{page.name}</span>
                  {/* <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                    {!page.isDefault && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (activePage.id === page.id) {
                              startEditingPage(page)
                            } else {
                              handlePageSelect(page)
                              setTimeout(() => startEditingPage(page), 100)
                            }
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
                  </div> */}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <Dialog open={newPageDialogOpen} onOpenChange={setNewPageDialogOpen}>
                <DialogTrigger asChild>
                  {/* <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      setNewPageDialogOpen(true)
                    }}
                    className="text-primary"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    <span>Create New Page</span>
                  </DropdownMenuItem> */}
                </DialogTrigger>
                <DialogContent className="bg-[#333] border-[#444] text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Page</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Enter a name for your new page.
                    </DialogDescription>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Center section - Device toggles */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
        <button
          className={cn(
            "relative h-8 w-8 cursor-pointer flex items-center justify-center group",
            activeDevice === "desktop" && "text-primary",
          )}
          onClick={() => {
            setActiveDevice("desktop")
            handleChangeView([1920, 1080])
          }}
        >
          <Monitor className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Desktop
          </span>
        </button>

        <button
          className={cn(
            "relative h-8 w-8 cursor-pointer flex items-center justify-center group",
            activeDevice === "laptop" && "text-primary",
          )}
          onClick={() => {
            setActiveDevice("laptop")
            handleChangeView([1366, 768])
          }}
        >
          <Laptop className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Laptop
          </span>
        </button>

        <button
          className={cn(
            "relative h-8 w-8 cursor-pointer flex items-center justify-center group",
            activeDevice === "tablet" && "text-primary",
          )}
          onClick={() => {
            setActiveDevice("tablet")
            handleChangeView([768, 1024])
          }}
        >
          <Tablet className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Tablet
          </span>
        </button>

        <button
          className={cn(
            "relative h-8 w-8 cursor-pointer flex items-center justify-center group",
            activeDevice === "mobile" && "text-primary",
          )}
          onClick={() => {
            setActiveDevice("mobile")
            handleChangeView([375, 667])
          }}
        >
          <Smartphone className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Mobile
          </span>
        </button>

        <button
          className={cn(
            "relative h-8 w-8 cursor-pointer flex items-center justify-center group",
            activeDevice === "grid" && "text-primary",
          )}
          onClick={() => setActiveDevice("grid")}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Grid
          </span>
        </button>

        {/* Resolution selector */}
        <Select value={selectedResolution} onValueChange={handleResolutionChange}>
          <SelectTrigger className="h-8 w-40 bg-[#2d2d2d] border-[#444] text-xs">
            <SelectValue placeholder="Select resolution" />
          </SelectTrigger>
          <SelectContent className="bg-[#333] border-[#444] text-white">
            {Object.entries(resolutions).map(([category, resList]) => (
              <SelectGroup key={category}>
                <SelectLabel>{category}</SelectLabel>
                {resList.map((res) => (
                  <SelectItem key={res.label} value={res.size.join("x")}>
                    {res.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2">
        {/* Action buttons */}
        <button className="h-8 w-8 flex items-center justify-center" title="Preview code">
          <Code className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Zoom out">
          <Minus className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Zoom in">
          <Plus className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Refresh" onClick={handleReset}>
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="View Docs">
          <FileText className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Add Photo">
          <ImageIcon className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Archive">
          <Archive className="w-4 h-4" />
        </button>

        <button className="h-8 w-8 flex items-center justify-center" title="Preview">
          <Eye className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="Settings">
          <Settings className="w-4 h-4" />
        </button>
        <button className="h-8 w-8 flex items-center justify-center" title="User">
          <User className="w-4 h-4" />
        </button>
        <div className="px-2 cursor-pointer text-sm font-medium">EN</div>
      </div>
    </div>
  )
}
