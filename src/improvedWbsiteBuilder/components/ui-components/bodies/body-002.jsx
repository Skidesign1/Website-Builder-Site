export function Body002() {
  return (
    <div className="w-full bg-muted p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-background p-4">
            <div className="w-full aspect-video bg-primary/10 flex items-center justify-center mb-2">
              <span>Image</span>
            </div>
            <h3 className="font-medium mb-1 text-sm">Feature One</h3>
            <p className="text-xs text-muted-foreground">
              A brief description of this feature and its benefits to users.
            </p>
          </div>
          <div className="bg-background p-4">
            <div className="w-full aspect-video bg-primary/10 flex items-center justify-center mb-2">
              <span>Image</span>
            </div>
            <h3 className="font-medium mb-1 text-sm">Feature Two</h3>
            <p className="text-xs text-muted-foreground">
              A brief description of this feature and its benefits to users.
            </p>
          </div>
          <div className="bg-background p-4">
            <div className="w-full aspect-video bg-primary/10 flex items-center justify-center mb-2">
              <span>Image</span>
            </div>
            <h3 className="font-medium mb-1 text-sm">Feature Three</h3>
            <p className="text-xs text-muted-foreground">
              A brief description of these feature and its benefits to users.
            </p>
            <link>hello world</link>
          </div>
        </div>
      </div>
    </div>
  )
}
