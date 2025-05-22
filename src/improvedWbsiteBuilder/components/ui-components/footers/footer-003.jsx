export function Footer003() {
  return (
    <div className="w-full bg-muted p-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <div className="font-bold text-lg mb-2">Company</div>
          <p className="text-xs text-muted-foreground max-w-xs">
            Making the world a better place through innovative solutions and exceptional customer experiences.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium mb-2 text-sm">Solutions</h3>
            <ul className="space-y-1 text-xs">
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm">Support</h3>
            <ul className="space-y-1 text-xs">
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Guides</li>
              <li>API Status</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-sm">Company</h3>
            <ul className="space-y-1 text-xs">
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Partners</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-muted-foreground/10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
        <div>© 2025 Company, Inc. All rights reserved.</div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Settings</span>
        </div>
      </div>
    </div>
  )
}
