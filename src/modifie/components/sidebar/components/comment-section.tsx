export default function CommentSection() {
  return (
    <div className="w-full border rounded-md p-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="space-y-4">
        <div className="border-b pb-3">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">U</div>
            <div>
              <p className="font-medium">User123</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <p className="text-sm">This is a great product! I highly recommend it.</p>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">J</div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>
          <p className="text-sm">I've been using this for a week now and it works great!</p>
        </div>
      </div>
      <div className="mt-4">
        <textarea className="w-full border rounded-md p-2 text-sm" placeholder="Add a comment..." rows={3}></textarea>
        <button className="bg-primary text-white px-4 py-1 rounded-md text-sm mt-2">Post Comment</button>
      </div>
    </div>
  )
}

