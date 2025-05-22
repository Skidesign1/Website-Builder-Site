export function Navbar005() {
  return (
    <div className="w-full bg-primary/10 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary/30 rounded-sm"></div>
          <span className="font-bold">AppName</span>
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background rounded-sm px-3 py-1 w-full max-w-xs mx-auto">
            <div className="text-xs text-center text-muted-foreground">Search...</div>
          </div>
        </div>
        <div className="flex space-x-3">
          <span>Docs</span>
          <span>Support</span>
          <span>Login</span>
        </div>
      </div>
    </div>
  )
}
