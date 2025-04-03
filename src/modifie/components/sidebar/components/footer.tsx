export default function Footer() {
  return (
    <footer className="w-full bg-muted p-6 rounded-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                News
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Email Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Call Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Office Locations
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t pt-4 text-center text-sm text-muted-foreground">
        © 2023 Company Name. All rights reserved.
      </div>
    </footer>
  )
}

