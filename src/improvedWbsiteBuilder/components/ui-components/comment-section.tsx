export function CommentSection() {
  return (
    <div className="w-full bg-muted p-4">
      <h3 className="font-medium mb-2">Comments</h3>
      <div className="space-y-2">
        <div className="bg-background p-2 text-xs">
          <div className="font-medium">User 1</div>
          <p>Great content!</p>
        </div>
        <div className="bg-background p-2 text-xs">
          <div className="font-medium">User 2</div>
          <p>I love this website!</p>
        </div>
      </div>
    </div>
  )
}
