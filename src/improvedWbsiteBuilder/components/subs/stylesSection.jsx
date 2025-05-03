import React, { useState } from "react";

function MyComponent() {
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const [color, setColor] = useState("red");
  const [textAlign, setTextAlign] = useState("center");
  const [textDecoration, setTextDecoration] = useState("underline");
  const [opacity, setOpacity] = useState("0.1");
  const [letterSpacing, setLetterSpacing] = useState("10px");
  const [overflow, setOverflow] = useState("visible");
  const [width, setWidth] = useState("1080px");
  const [height, setHeight] = useState("1200px");
  const [borderRadius, setBorderRadius] = useState("10px");
  const [objectFit, setObjectFit] = useState("contain");
  const [padding, setPadding] = useState("10px");
  const [borderStyle, setBorderStyle] = useState("dotted");

  return (
    <div className="bg-white border-b p-3 text-sm">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-semibold text-gray-600">CSS Style</label>
        <button className="text-blue-500 underline text-xs">Edit</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Size:
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value, 10) || 14)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Family:
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Roboto">Roboto</option>
            <option value="Arial">Arial</option>
          </select>
        </div>

        <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">Color:</label>
    <div className="inline-block border rounded shadow-sm px-2 py-1 hover:bg-red-200 transition-colors duration-200">
        <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
        />
    </div>
</div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Align:
          </label>
          <select
            value={textAlign}
            onChange={(e) => setTextAlign(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Decor:
          </label>
          <select
            value={textDecoration}
            onChange={(e) => setTextDecoration(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="line-through">Line-through</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Opacity:
          </label>
          <input
            type="number"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
            max="1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Spacing:
          </label>
          <input
            type="text"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Overflow:
          </label>
          <select
            value={overflow}
            onChange={(e) => setOverflow(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="visible">visible</option>
            <option value="hidden">hidden</option>
            <option value="scroll">scroll</option>
            <option value="auto">auto</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Width:
          </label>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Height:
          </label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Radius:
          </label>
          <input
            type="text"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fit:
          </label>
          <select
            value={objectFit}
            onChange={(e) => setObjectFit(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="contain">contain</option>
            <option value="cover">cover</option>
            <option value="fill">fill</option>
            <option value="none">none</option>
            <option value="scale-down">scale-down</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Padding:
          </label>
          <input
            type="text"
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stroke:
          </label>
          <select
            value={borderStyle}
            onChange={(e) => setBorderStyle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dotted">Dotted</option>
            <option value="dashed">Dashed</option>
            <option value="double">Double</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
