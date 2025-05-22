export function Navbar003() {
  return (
    <div className="w-full   justify-between flex bg-primary/10 p-3">
      <div className="flex  items-center justify-between">
        <div className="font-bold text-xl">Luli</div>
        <div className="flex space-x-4">
          <span>Home</span>
          <span>Features</span>
          <span>Pricing</span>
          <span>About</span>
        </div>
        <button className="bg-primary text-primary-foreground px-3 py-1 rounded-sm text-sm">Sign Up</button>
      </div>
    </div>
  )
}
