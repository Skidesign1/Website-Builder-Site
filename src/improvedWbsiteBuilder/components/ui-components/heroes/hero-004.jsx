export function Hero004() {
  return (
    <div className="w-full bg-muted p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-3">Elevate Your Digital Experience</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Our platform provides everything you need to build, manage, and scale your online presence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-sm text-sm">
                Start Free Trial
              </button>
              <button className="border border-muted-foreground/30 px-4 py-2 rounded-sm text-sm">Talk to Sales</button>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary/30"></div>
                <div className="w-6 h-6 rounded-full bg-primary/50"></div>
                <div className="w-6 h-6 rounded-full bg-primary/70"></div>
              </div>
              <span className="text-xs ml-2">Trusted by 10,000+ companies</span>
            </div>
          </div>
          <div className="bg-primary/10 aspect-video flex items-center justify-center rounded-sm">
            <span className="text-4xl">🖼️</span>
          </div>
        </div>
      </div>
    </div>
  )
}
