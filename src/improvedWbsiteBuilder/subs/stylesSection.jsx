'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function MyComponent() {
  const dispatch = useDispatch();
  const containerStyle = useSelector(state => state.containerStyle);

  const [fontSize, setFontSize] = useState(containerStyle.fontSize);
  const [fontFamily, setFontFamily] = useState(containerStyle.fontFamily);
  const [color, setColor] = useState(containerStyle.color);
  const [textAlign, setTextAlign] = useState(containerStyle.textAlign);
  const [opacity, setOpacity] = useState(containerStyle.opacity);
  const [letterSpacing, setLetterSpacing] = useState(containerStyle.letterSpacing);
  const [width, setWidth] = useState(containerStyle.width);
  const [height, setHeight] = useState(containerStyle.height);
  const [borderRadius, setBorderRadius] = useState(containerStyle.borderRadius);
  const [objectFit, setObjectFit] = useState(containerStyle.objectFit);
  const [padding, setPadding] = useState(containerStyle.padding);
  const [margin, setMargin] = useState(containerStyle.margin || '0px');
  const [boxShadow, setBoxShadow] = useState(containerStyle.boxShadow || 'none');
  const [position, setPosition] = useState(containerStyle.position || 'static');
  const [borderStyle, setBorderStyle] = useState(containerStyle.borderStyle);
  const [headerBackground, setHeaderBackground] = useState(containerStyle.headerBackground || 'white/95');
  const [headerBorder, setHeaderBorder] = useState(containerStyle.headerBorder || 'gray-200');
  const [shadowDefault, setShadowDefault] = useState(containerStyle.shadowDefault || 'sm');
  const [headerPaddingX, setHeaderPaddingX] = useState(containerStyle.headerPaddingX || 8);
  const [headerHeight, setHeaderHeight] = useState(containerStyle.headerHeight || 24);
  const [logoSrc, setLogoSrc] = useState(containerStyle.logoSrc || '/assets/logo.png');
  const [logoAlt, setLogoAlt] = useState(containerStyle.logoAlt || 'Brand Logo');
  const [logoSizeHeight, setLogoSizeHeight] = useState(containerStyle.logoSizeHeight || 12);
  const [logoSizeWidth, setLogoSizeWidth] = useState(containerStyle.logoSizeWidth || 12);
  const [brandName, setBrandName] = useState(containerStyle.brandName || 'Micah');
  const [textSize, setTextSize] = useState(containerStyle.textSize || '3xl');
  const [textColor, setTextColor] = useState(containerStyle.textColor || 'gray-900');
  const [desktopSpacing, setDesktopSpacing] = useState(containerStyle.desktopSpacing || 14);
  const [desktopPaddingX, setDesktopPaddingX] = useState(containerStyle.desktopPaddingX || 4);
  const [desktopPaddingY, setDesktopPaddingY] = useState(containerStyle.desktopPaddingY || 3);
  const [activeIndicatorColor, setActiveIndicatorColor] = useState(containerStyle.activeIndicatorColor || 'indigo-600');
  const [activeIndicatorHeight, setActiveIndicatorHeight] = useState(containerStyle.activeIndicatorHeight || '3px');
  const [activeIndicatorWidth, setActiveIndicatorWidth] = useState(containerStyle.activeIndicatorWidth || '4/5');
  const [activeIndicatorRounded, setActiveIndicatorRounded] = useState(containerStyle.activeIndicatorRounded || 'full');
  const [ctaSpacing, setCtaSpacing] = useState(containerStyle.ctaSpacing || 8);
  const [ctaPrimarySizeX, setCtaPrimarySizeX] = useState(containerStyle.ctaPrimarySizeX || 8);
  const [ctaPrimarySizeY, setCtaPrimarySizeY] = useState(containerStyle.ctaPrimarySizeY || 4);
  const [ctaPrimaryRounded, setCtaPrimaryRounded] = useState(containerStyle.ctaPrimaryRounded || 'xl');
  const [ctaPrimaryColorFrom, setCtaPrimaryColorFrom] = useState(containerStyle.ctaPrimaryColorFrom || 'indigo-600');
  const [ctaPrimaryColorTo, setCtaPrimaryColorTo] = useState(containerStyle.ctaPrimaryColorTo || 'indigo-500');
  const [ctaPrimaryTextColor, setCtaPrimaryTextColor] = useState(containerStyle.ctaPrimaryTextColor || 'white');
  const [ctaPrimaryIconSizeWidth, setCtaPrimaryIconSizeWidth] = useState(containerStyle.ctaPrimaryIconSizeWidth || 5);
  const [ctaPrimaryIconSizeHeight, setCtaPrimaryIconSizeHeight] = useState(containerStyle.ctaPrimaryIconSizeHeight || 5);
  const [mobileMenuButtonPadding, setMobileMenuButtonPadding] = useState(containerStyle.mobileMenuButtonPadding || 4);
  const [mobileMenuButtonSizeHeight, setMobileMenuButtonSizeHeight] = useState(containerStyle.mobileMenuButtonSizeHeight || 8);
  const [mobileMenuButtonSizeWidth, setMobileMenuButtonSizeWidth] = useState(containerStyle.mobileMenuButtonSizeWidth || 8);
  const [mobileMenuBackground, setMobileMenuBackground] = useState(containerStyle.mobileMenuBackground || 'white/95');
  const [mobileMenuBorder, setMobileMenuBorder] = useState(containerStyle.mobileMenuBorder || 'gray-200');
  const [mobileMenuSectionSpacing, setMobileMenuSectionSpacing] = useState(containerStyle.mobileMenuSectionSpacing || 6);

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
            onChange={e => {
              const newFontSize = parseInt(e.target.value, 10) || 0;
              setFontSize(newFontSize);
              dispatch({ type: 'containerStyle/setFontSize', payload: newFontSize });
            }}
            className={commonInputClass}
          />
        </div>
        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Font Family:</label>
          <Select
            value={fontFamily}
            onValueChange={value => {
              setFontFamily(value);
              dispatch({ type: 'containerStyle/setFontFamily', payload: value });
            }}
          >
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
              onChange={e => {
                setColor(e.target.value);
                dispatch({ type: 'containerStyle/setColor', payload: e.target.value });
              }}
              className='w-9 h-9 p-0.5 border border-[#555] bg-[#333] rounded-md cursor-pointer'
            />
            <Input
              type='text'
              value={color}
              onChange={e => {
                setColor(e.target.value);
                dispatch({ type: 'containerStyle/setColor', payload: e.target.value });
              }}
              className={`${commonInputClass} flex-1`}
              placeholder='#RRGGBB'
            />
          </div>
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Text Align:</label>
          <Select
            value={textAlign}
            onValueChange={value => {
              setTextAlign(value);
              dispatch({ type: 'containerStyle/setTextAlign', payload: value });
            }}
          >
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
          <label className='block text-gray-400 text-xs font-medium mb-1'>Opacity (0-1):</label>
          <Input
            type='number'
            value={opacity}
            onChange={e => {
              const val = parseFloat(e.target.value);
              if (val >= 0 && val <= 1) {
                setOpacity(e.target.value);
                dispatch({
                  type: 'containerStyle/setOpacity',
                  payload: parseFloat(e.target.value),
                });
              } else if (e.target.value === '') setOpacity('');
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
            onChange={e => {
              setLetterSpacing(e.target.value);
              dispatch({ type: 'containerStyle/setLetterSpacing', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 2px or 0.1em'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Width:</label>
          <Input
            type='text'
            value={width}
            onChange={e => {
              setWidth(e.target.value);
              dispatch({ type: 'containerStyle/setWidth', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 100px or 50%'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Height:</label>
          <Input
            type='text'
            value={height}
            onChange={e => {
              setHeight(e.target.value);
              dispatch({ type: 'containerStyle/setHeight', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 100px or auto'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Border Radius:</label>
          <Input
            type='text'
            value={borderRadius}
            onChange={e => {
              setBorderRadius(e.target.value);
              dispatch({ type: 'containerStyle/setBorderRadius', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 8px or 50%'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Object Fit:</label>
          <Select
            value={objectFit}
            onValueChange={value => {
              setObjectFit(value);
              dispatch({ type: 'containerStyle/setObjectFit', payload: value });
            }}
          >
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
          <label className='block text-gray-400 text-xs font-medium mb-1'>Object Fit:</label>
          <Select
            value={objectFit}
            onValueChange={value => {
              setObjectFit(value);
              dispatch({ type: 'containerStyle/setObjectFit', payload: value });
            }}>
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
            onChange={e => {
              setPadding(e.target.value);
              dispatch({ type: 'containerStyle/setPadding', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 10px or 10px 20px'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Border Style:</label>
          <Select
            value={borderStyle}
            onValueChange={value => {
              setBorderStyle(value);
              dispatch({ type: 'containerStyle/setBorderStyle', payload: value });
            }}>
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

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Margin:</label>
          <Input
            type='text'
            value={margin}
            onChange={e => {
              setMargin(e.target.value);
              dispatch({ type: 'containerStyle/setMargin', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 10px or 10px 20px'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Box Shadow:</label>
          <Input
            type='text'
            value={boxShadow}
            onChange={e => {
              setBoxShadow(e.target.value);
              dispatch({ type: 'containerStyle/setBoxShadow', payload: e.target.value });
            }}
            className={commonInputClass}
            placeholder='e.g., 2px 2px 4px #000000'
          />
        </div>

        <div>
          <label className='block text-gray-400 text-xs font-medium mb-1'>Position:</label>
          <Select
            value={position}
            onValueChange={value => {
              setPosition(value);
              dispatch({ type: 'containerStyle/setPosition', payload: value });
            }}>
            <SelectTrigger className={commonSelectTriggerClass}>
              <SelectValue placeholder='Select position' />
            </SelectTrigger>
            <SelectContent className={commonSelectContentClass}>
              <SelectItem value='static' className={commonSelectItemClass}>
                Static
              </SelectItem>
              <SelectItem value='relative' className={commonSelectItemClass}>
                Relative
              </SelectItem>
              <SelectItem value='absolute' className={commonSelectItemClass}>
                Absolute
              </SelectItem>
              <SelectItem value='fixed' className={commonSelectItemClass}>
                Fixed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// Add dispatch actions for all the new inputs
