import componentRegistry from "./ui-components/component-registry"

export function ComponentPreview({ type, label, component }) {
  // Find the component in the registry if not directly provided
  const registryComponent = component || componentRegistry.find((item) => item.type === type && item.label === label)

  return (
    <div className="flex min-w-[50vw] rounded-md border shadow-md">
      <div className="w-full">
        {registryComponent ? registryComponent.component : <div className="text-xs">{label}</div>}
      </div>
      {/* <div className="text-xs font-medium">{label}</div> */}
    </div>
  )
}
