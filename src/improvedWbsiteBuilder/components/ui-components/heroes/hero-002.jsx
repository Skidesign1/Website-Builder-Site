export function Hero002() {
  return (
    <div className="w-full bg-muted p-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-8">
          <h2 className="text-2xl font-bold mb-2">Transform Your Business</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Our platform helps you streamline operations, increase revenue, and delight your customers.
          </p>
          <div className="flex space-x-2">
            <button className="bg-primary text-primary-foreground px-4 py-1 rounded-sm text-sm">Try Now</button>
            <button className="border border-primary text-primary px-4 py-1 rounded-sm text-sm">Learn More</button>
          </div>
        </div>
        <div className="md:w-1/2 bg-primary/10 aspect-video flex items-center justify-center">
          <span className="text-4xl">🖼️</span>
        </div>
      </div>
    </div>
  )
}
