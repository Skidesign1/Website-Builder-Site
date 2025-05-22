export function Navbar006() {
  return (
    <div className="w-full bg-primary/10 p-3">
      <div className="flex items-center justify-between">
        <div className="font-bold text-xl">LOGO</div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
            <span>Products</span>
            <span>Solutions</span>
            <span>Resources</span>
            <span>Pricing</span>
          </div>
          <div className="h-4 w-px bg-muted-foreground/30"></div>
          <div className="flex space-x-2">
            <button className="text-sm">Log in</button>
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm">Try Free</button>
          </div>
        </div>
      </div>
    </div>
  )
}
