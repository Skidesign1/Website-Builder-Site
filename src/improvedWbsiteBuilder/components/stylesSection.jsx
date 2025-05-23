import React, { useState } from "react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

function StyleEditorPanel() {
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
    <div className="bg-[#2d2d2d] p-3 text-sm text-white">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-xs font-semibold text-gray-300">CSS Style</Label>
        <Button variant="link" className="text-blue-400 hover:text-blue-300 text-xs p-0 h-auto self-center">Edit</Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Size:
          </Label>
          <Input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value, 10) || 14)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Font Size"
          />
        </div>
        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Family:
          </Label>
          <Select value={fontFamily} onValueChange={(value) => setFontFamily(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select family" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Font Family</SelectLabel>
                <SelectItem value="Roboto" className="hover:!bg-[#444] focus:!bg-[#444]">Roboto</SelectItem>
                <SelectItem value="Arial" className="hover:!bg-[#444] focus:!bg-[#444]">Arial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">Color:</Label>
          <div className="inline-block border border-[#555] rounded shadow-sm px-2 py-1 hover:bg-[#444] transition-colors duration-200">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-[#333] w-full h-10 border border-[#555] rounded-md cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Align:
          </Label>
          <Select value={textAlign} onValueChange={(value) => setTextAlign(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select align" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Text Align</SelectLabel>
                <SelectItem value="left" className="hover:!bg-[#444] focus:!bg-[#444]">Left</SelectItem>
                <SelectItem value="center" className="hover:!bg-[#444] focus:!bg-[#444]">Center</SelectItem>
                <SelectItem value="right" className="hover:!bg-[#444] focus:!bg-[#444]">Right</SelectItem>
                <SelectItem value="justify" className="hover:!bg-[#444] focus:!bg-[#444]">Justify</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Decor:
          </Label>
          <Select value={textDecoration} onValueChange={(value) => setTextDecoration(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select decoration" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Text Decoration</SelectLabel>
                <SelectItem value="none" className="hover:!bg-[#444] focus:!bg-[#444]">None</SelectItem>
                <SelectItem value="underline" className="hover:!bg-[#444] focus:!bg-[#444]">Underline</SelectItem>
                <SelectItem value="overline" className="hover:!bg-[#444] focus:!bg-[#444]">Overline</SelectItem>
                <SelectItem value="line-through" className="hover:!bg-[#444] focus:!bg-[#444]">Line-through</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Opacity:
          </Label>
          <Input
            type="number"
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Opacity"
            min="0"
            max="1"
            step="0.1"
          />
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Spacing:
          </Label>
          <Input
            type="text"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Letter Spacing"
          />
        </div>
        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Overflow:
          </Label>
          <Select value={overflow} onValueChange={(value) => setOverflow(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select overflow" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Overflow</SelectLabel>
                <SelectItem value="visible" className="hover:!bg-[#444] focus:!bg-[#444]">Visible</SelectItem>
                <SelectItem value="hidden" className="hover:!bg-[#444] focus:!bg-[#444]">Hidden</SelectItem>
                <SelectItem value="scroll" className="hover:!bg-[#444] focus:!bg-[#444]">Scroll</SelectItem>
                <SelectItem value="auto" className="hover:!bg-[#444] focus:!bg-[#444]">Auto</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Width:
          </Label>
          <Input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Width"
          />
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Height:
          </Label>
          <Input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Height"
          />
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Radius:
          </Label>
          <Input
            type="text"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Border Radius"
          />
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Fit:
          </Label>
          <Select value={objectFit} onValueChange={(value) => setObjectFit(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select fit" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Object Fit</SelectLabel>
                <SelectItem value="contain" className="hover:!bg-[#444] focus:!bg-[#444]">Contain</SelectItem>
                <SelectItem value="cover" className="hover:!bg-[#444] focus:!bg-[#444]">Cover</SelectItem>
                <SelectItem value="fill" className="hover:!bg-[#444] focus:!bg-[#444]">Fill</SelectItem>
                <SelectItem value="none" className="hover:!bg-[#444] focus:!bg-[#444]">None</SelectItem>
                <SelectItem value="scale-down" className="hover:!bg-[#444] focus:!bg-[#444]">Scale-down</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Padding:
          </Label>
          <Input
            type="text"
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
            className="bg-[#333] border-[#555] text-white focus-visible:ring-indigo-500"
            placeholder="Padding"
          />
        </div>

        <div>
          <Label className="block text-gray-300 text-sm font-bold mb-2">
            Stroke:
          </Label>
          <Select value={borderStyle} onValueChange={(value) => setBorderStyle(value)}>
            <SelectTrigger className="w-full bg-[#333] border-[#555] text-white focus:ring-indigo-500">
              <SelectValue placeholder="Select stroke" />
            </SelectTrigger>
            <SelectContent className="bg-[#2d2d2d] border-[#555] text-white">
              <SelectGroup>
                <SelectLabel className="text-gray-400">Border Style</SelectLabel>
                <SelectItem value="none" className="hover:!bg-[#444] focus:!bg-[#444]">None</SelectItem>
                <SelectItem value="solid" className="hover:!bg-[#444] focus:!bg-[#444]">Solid</SelectItem>
                <SelectItem value="dotted" className="hover:!bg-[#444] focus:!bg-[#444]">Dotted</SelectItem>
                <SelectItem value="dashed" className="hover:!bg-[#444] focus:!bg-[#444]">Dashed</SelectItem>
                <SelectItem value="double" className="hover:!bg-[#444] focus:!bg-[#444]">Double</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default StyleEditorPanel;
