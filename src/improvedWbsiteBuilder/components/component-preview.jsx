import React, { useEffect, useState } from "react"
import * as Babel from "@babel/standalone"
import { useSelector } from "react-redux"

export function ComponentPreview({ type, label, component }) {
  const [RemoteComponent, setRemoteComponent] = useState(null)
  const [error, setError] = useState(null)
  const { canvasSize } = useSelector((state) => state.canvas)
  const code =
    typeof component === "string"
      ? component
      : typeof component?.component === "string"
        ? component.component
        : null

  useEffect(() => {
    const fetchAndTranspile = async () => {
      try {
        if (!code) {
          console.log("No code to transpile:", { component, code })
          setError("No component code available")
          return
        }

        // Transpile JSX + CommonJS (we support module.exports)
        const transpiled = Babel.transform(code, {
          presets: ["react"],
        }).code

        // Simulate CommonJS environment
        const module = { exports: {} }
        const exports = module.exports

        // Execute transpiled code in an isolated scope
        const fn = new Function("React", "module", "exports", "window", transpiled)
        fn(React, module, exports, window)

        const LoadedComponent = module.exports.default || module.exports

        if (typeof LoadedComponent !== "function" && typeof LoadedComponent !== "object") {
          setError("Component is not a valid React component")
          return
        }

        setRemoteComponent(() => LoadedComponent)
        setError(null)
      } catch (err) {
        console.error("Error transpiling component:", err)
        setError(err.message)
      }
    }

    fetchAndTranspile()
  }, [code])

  return (
    <div className="w-full">
      <div>
        {error ? (
          <div className="p-4 text-red-500">
            <p>Error loading component: {error}</p>
          </div>
        ) : RemoteComponent ? (
          <div style={{
            transition: "width 0.3s, height 0.3s",
          }}>
            <RemoteComponent />
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center text-xs">
            {label || "Loading component..."}
          </div>
        )}
      </div>
    </div>
  )
}
