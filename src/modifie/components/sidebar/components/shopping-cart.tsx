export default function ShoppingCart() {
  return (
    <div className="w-full border rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <p className="font-medium">Product 1</p>
            <p className="text-sm text-muted-foreground">Quantity: 1</p>
          </div>
          <p className="font-medium">$29.99</p>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <p className="font-medium">Product 2</p>
            <p className="text-sm text-muted-foreground">Quantity: 2</p>
          </div>
          <p className="font-medium">$59.98</p>
        </div>
        <div className="flex justify-between font-bold pt-2">
          <p>Total:</p>
          <p>$89.97</p>
        </div>
        <button className="w-full bg-primary text-white py-2 rounded-md mt-4">Checkout</button>
      </div>
    </div>
  )
}

