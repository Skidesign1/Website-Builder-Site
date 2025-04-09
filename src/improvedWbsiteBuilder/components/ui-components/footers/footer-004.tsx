export function Footer004() {
  return (
    <div className="w-full bg-muted p-6">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="font-bold text-xl mb-2">Brand Logo</div>
        <p className="text-xs text-muted-foreground max-w-md">
          Subscribe to our newsletter for the latest updates, features, and resources.
        </p>
        <div className="flex mt-4 w-full max-w-sm">
          <div className="flex-1 bg-background h-8 rounded-l-sm flex items-center px-3">
            <span className="text-xs text-muted-foreground">Enter your email</span>
          </div>
          <button className="bg-primary text-primary-foreground h-8 px-4 text-xs rounded-r-sm">Subscribe</button>
        </div>
      </div>
      <div className="flex justify-center space-x-6 mb-6">
        <span className="text-xs">Twitter</span>
        <span className="text-xs">Facebook</span>
        <span className="text-xs">Instagram</span>
        <span className="text-xs">GitHub</span>
        <span className="text-xs">YouTube</span>
      </div>
      <div className="border-t border-muted-foreground/10 pt-4 text-center text-xs">
        <div>© 2025 Company, Inc. All rights reserved.</div>
        <div className="flex justify-center space-x-4 mt-2">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>
    </div>
  )
}
