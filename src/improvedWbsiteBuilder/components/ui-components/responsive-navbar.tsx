export function ResponsiveNavbar() {
  return (
    <div className="w-full bg-primary/10 p-3">
      <div className="flex justify-between items-center">
        <div className="font-bold">Logo</div>
        <div className="flex space-x-4">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>
    </div>
  )
}
