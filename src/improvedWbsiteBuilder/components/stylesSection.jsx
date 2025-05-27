'use client';
import React, { useState } from 'react';
import { Button } from './ui/button'; // Adjust path if needed: e.g., ../ui/button
import { Input } from './ui/input'; // Adjust path if needed
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'; // Adjust path if needed

export default function MyComponent() {
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [color, setColor] = useState('#ff0000');
  const [textAlign, setTextAlign] = useState('center');
  const [textDecoration, setTextDecoration] = useState('underline');
  const [opacity, setOpacity] = useState('1'); // Opacity state as string, input type number handles conversion
  const [letterSpacing, setLetterSpacing] = useState('0px'); // Default to valid CSS
  const [overflow, setOverflow] = useState('visible');
  const [width, setWidth] = useState('100px'); // More practical default
  const [height, setHeight] = useState('100px'); // More practical default
  const [borderRadius, setBorderRadius] = useState('0px');
  const [objectFit, setObjectFit] = useState('contain');
  const [padding, setPadding] = useState('10px');
  const [borderStyle, setBorderStyle] = useState('solid'); // Changed default to solid for visibility

  const commonInputClass =
    'h-9 bg-[#333] border-[#555] text-white rounded-md focus:border-primary placeholder:text-gray-500';
  const commonSelectTriggerClass =
    'h-9 bg-[#333] border-[#555] text-white rounded-md hover:bg-[#444] focus:border-primary';
  const commonSelectContentClass = 'bg-[#2d2d2d] border-[#444] text-white rounded-md shadow-lg';
  const commonSelectItemClass =
    'px-3 py-1.5 text-xs hover:bg-[#444] rounded-sm cursor-pointer data-[state=checked]:bg-[#555]';

  return (
    <div className='bg-[#2d2d2d] text-white border-b border-[#222] p-4 text-sm rounded-lg'>
      <div className='flex justify-between items-center mb-4'>
        <label className='text-sm font-semibold text-gray-200'>CSS Properties</label>
        <Button variant='link' className='text-blue-400 hover:text-blue-300 text-xs px-1 h-auto'>
          Edit All
        </Button>
      </div>

      <div className='grid grid-cols-2 gap-x-3 gap-y-4'>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Font Size (px):</label>
          <Input
            type='number'
            value={fontSize}
            onChange={e => setFontSize(parseInt(e.target.value, 10) || 0)}
            className={commonInputClass}
          />
        </div>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Font Family:</label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select family' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='Roboto' className={commonSelectItemClass}>
                Roboto
              </SelectItem>
              <SelectItem value='Arial' className={commonSelectItemClass}>
                Arial
              </SelectItem>
              <SelectItem value='Verdana' className={commonSelectItemClass}>
                Verdana
              </SelectItem>
              <SelectItem value='Georgia' className={commonSelectItemClass}>
                Georgia
              </SelectItem>
              <SelectItem value='Times New Roman' className={commonSelectItemClass}>
                Times New Roman
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Color:</label>
          <div className='flex items-center space-x-2'>
            <Input
              type='color'
              value={color}
              onChange={e => setColor(e.target.value)}
              className='w-9 h-9 p-0.5 border border-[#555] bg-[#333] rounded-md cursor-pointer'
            />
            <Input
              type='text'
              value={color}
              onChange={e => setColor(e.target.value)}
              className={`${commonInputClass} flex-1`}
              placeholder='#RRGGBB'
            />
          </div>
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Text Align:</label>
          <Select value={textAlign} onValueChange={setTextAlign}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select alignment' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='left' className={commonSelectItemClass}>
                Left
              </SelectItem>
              <SelectItem value='center' className={commonSelectItemClass}>
                Center
              </SelectItem>
              <SelectItem value='right' className={commonSelectItemClass}>
                Right
              </SelectItem>
              <SelectItem value='justify' className={commonSelectItemClass}>
                Justify
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Decoration:</label>
          <Select value={textDecoration} onValueChange={setTextDecoration}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select decoration' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='none' className={commonSelectItemClass}>
                None
              </SelectItem>
              <SelectItem value='underline' className={commonSelectItemClass}>
                Underline
              </SelectItem>
              <SelectItem value='overline' className={commonSelectItemClass}>
                Overline
              </SelectItem>
              <SelectItem value='line-through' className={commonSelectItemClass}>
                Line-through
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Opacity (0-1):</label>
          <Input
            type='number'
            value={opacity}
            onChange={e => {
              const val = parseFloat(e.target.value);
              if (val >= 0 && val <= 1) setOpacity(e.target.value);
              else if (e.target.value === '') setOpacity('');
            }}
            className={commonInputClass}
            min='0'
            max='1'
            step='0.01'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Letter Spacing:</label>
          <Input
            type='text'
            value={letterSpacing}
            onChange={e => setLetterSpacing(e.target.value)}
            className={commonInputClass}
            placeholder='e.g., 2px or 0.1em'
          />
        </div>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Overflow:</label>
          <Select value={overflow} onValueChange={setOverflow}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select overflow' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='visible' className={commonSelectItemClass}>
                Visible
              </SelectItem>
              <SelectItem value='hidden' className={commonSelectItemClass}>
                Hidden
              </SelectItem>
              <SelectItem value='scroll' className={commonSelectItemClass}>
                Scroll
              </SelectItem>
              <SelectItem value='auto' className={commonSelectItemClass}>
                Auto
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Width:</label>
          <Input
            type='text'
            value={width}
            onChange={e => setWidth(e.target.value)}
            className={commonInputClass}
            placeholder='e.g., 100px or 50%'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Height:</label>
          <Input
            type='text'
            value={height}
            onChange={e => setHeight(e.target.value)}
            className={commonInputClass}
            placeholder='e.g., 100px or auto'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Border Radius:</label>
          <Input
            type='text'
            value={borderRadius}
            onChange={e => setBorderRadius(e.target.value)}
            className={commonInputClass}
            placeholder='e.g., 8px or 50%'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Object Fit:</label>
          <Select value={objectFit} onValueChange={setObjectFit}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select object fit' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='contain' className={commonSelectItemClass}>
                Contain
              </SelectItem>
              <SelectItem value='cover' className={commonSelectItemClass}>
                Cover
              </SelectItem>
              <SelectItem value='fill' className={commonSelectItemClass}>
                Fill
              </SelectItem>
              <SelectItem value='none' className={commonSelectItemClass}>
                None
              </SelectItem>
              <SelectItem value='scale-down' className={commonSelectItemClass}>
                Scale-down
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Padding:</label>
          <Input
            type='text'
            value={padding}
            onChange={e => setPadding(e.target.value)}
            className={commonInputClass}
            placeholder='e.g., 10px or 10px 20px'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Border Style:</label>
          <Select value={borderStyle} onValueChange={setBorderStyle}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select border style' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='none' className={commonSelectItemClass}>
                None
              </SelectItem>
              <SelectItem value='solid' className={commonSelectItemClass}>
                Solid
              </SelectItem>
              <SelectItem value='dotted' className={commonSelectItemClass}>
                Dotted
              </SelectItem>
              <SelectItem value='dashed' className={commonSelectItemClass}>
                Dashed
              </SelectItem>
              <SelectItem value='double' className={commonSelectItemClass}>
                Double
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
