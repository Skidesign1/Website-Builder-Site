export function ComponentOverlay({ type, label }) {
    return (
        <div className="flex items-center rounded-md border bg-card p-2 shadow-md">
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
                {type.charAt(0)}
            </span>
            <span className="text-sm">{label}</span>
        </div>
    )
}

