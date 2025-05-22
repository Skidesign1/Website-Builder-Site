export function Navbar004() {
  return (
    <div className="w-full bg-primary/10 p-3">
      <div className="flex justify-center items-center">
        <div className="font-bold text-xl mr-8">Company</div>
        <div className="flex space-x-4 flex-1">
          <span>Dashboard</span>
          <span>Team</span>
          <span>Projects</span>
          <span>Calendar</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center">
            <span className="text-xs">JD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
