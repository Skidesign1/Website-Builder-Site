export function Footer002() {
  return (
    <div className="w-full bg-muted p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <h3 className="font-medium mb-2 text-sm">Product</h3>
          <ul className="space-y-1 text-xs">
            <li>Featuring</li>
            <li>Pricing</li>
            <li>Integrations</li>
            <li>Changelog</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-sm">Company</h3>
          <ul className="space-y-1 text-xs">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-sm">Resources</h3>
          <ul className="space-y-1 text-xs">
            <li>Documentation</li>
            <li>Guides</li>
            <li>Support</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-sm">Legal</h3>
          <ul className="space-y-1 text-xs">
            <li>Privacy</li>
            <li>Terms</li>
            <li>Security</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-muted-foreground/10 pt-4 flex justify-between items-center text-xs">
        <div>© 2025 Company, Inc. All rights reserved.</div>
        <div className="flex space-x-4">
          <span>Twitter</span>
          <span>GitHub</span>
          <span>LinkedIn</span>
        </div>
      </div>
    </div>
  )
}
