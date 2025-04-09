
import { useState } from "react"
import { Search, Move, Layers, ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { DraggableSidebarItem } from "./draggable-sidebar-item"
import { PageTabs } from "./page-tabs"
import { LayoutView } from "./layout-view"
import componentRegistry, { componentCategories } from "./ui-components/component-registry"
import { cn } from "../../components/lib/utils"
import { DraggableComponent } from "./draggable-component"
import { Input } from "./ui/input"

export function WebsiteBuilderSidebar({
  pages,
  activePage,
  containers,
  onPageChange,
  onCreatePage,
  onRenamePage,
  onDeletePage,
  onDeleteContainer,
  onDeleteComponent,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("components")
  const [expandedCategories, setExpandedCategories] = useState({
    navbar: true,
    hero: true,
    footer: true,
  })

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Filter components based on search term
  const filteredComponents = componentRegistry.filter(
    (component) =>
      component.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group components by category
  const groupedComponents = componentCategories.map((category) => {
    const components = filteredComponents.filter((component) => component.category === category.id)
    return {
      ...category,
      components,
    }
  })

  return (
    <div className="no-scrollbar pb-[40px] bg-background p-4 overflow-auto min-h-[100vh]">
      <Tabs defaultValue="components" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="layouts">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Components..."
              className="pl-8 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Container */}
          <div className="border rounded-md p-2">
            <DraggableSidebarItem id="sidebar-container" title="Container" isContainer={true}>
              <div className="flex items-center">
                <Move className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Container</span>
              </div>
            </DraggableSidebarItem>
          </div>

          {/* Component Categories */}
          <div className="space-y-4">
            {groupedComponents.map((category) => (
              <div key={category.id} className="border rounded-md overflow-hidden">
                {/* Category Header */}
                <button
                  className="w-full flex items-center justify-between p-2 bg-muted/30 hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2 font-medium">{category.label}</span>
                  </div>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", expandedCategories[category.id] ? "rotate-180" : "")}
                  />
                </button>

                {/* Component Grid */}
                {expandedCategories[category.id] && (
                  <div className="p-2 grid grid-cols-2 gap-2">
                    {category.components.map((component) => (
                      <DraggableComponent
                        key={component.id}
                        id={component.id}
                        type={component.type}
                        label={component.label}
                        icon={category.icon}
                        thumbnail={component.thumbnail}
                        component={component}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Page tabs in sidebar */}
          <div className="pb-[50px]">
            <PageTabs
              pages={pages}
              activePage={activePage}
              onPageChange={onPageChange}
              onCreatePage={onCreatePage}
              onRenamePage={onRenamePage}
              onDeletePage={onDeletePage}
            />
          </div>
        </TabsContent>

        <TabsContent value="layouts">
          <div className="flex items-center mb-3">
            <Layers className="h-4 w-4 mr-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Page Structure</h3>
          </div>

          {/* Layout view in the sidebar */}
          <LayoutView
            containers={containers}
            activePage={activePage}
            onDeleteContainer={onDeleteContainer}
            onDeleteComponent={onDeleteComponent}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
