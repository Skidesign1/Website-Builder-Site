import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontSize: 14,
  fontFamily: 'Roboto',
  color: '#ff0000',
  textAlign: 'center',
  opacity: 1,
  letterSpacing: '0px',
  width: '100px',
  height: '100px',
  borderRadius: '0px',
  objectFit: 'contain',
  padding: '10px',
  margin: '0px',
  boxShadow: 'none',
  position: 'static',
  borderStyle: 'solid',
  headerBackground: 'white/95',
  headerBorder: 'gray-200',
  shadowDefault: 'sm',
  headerPaddingX: 8,
  headerHeight: 24,
  logoSrc: '/assets/logo.png',
  logoAlt: 'Brand Logo',
  logoSizeHeight: 12,
  logoSizeWidth: 12,
  brandName: 'Micah',
  textSize: '3xl',
  textColor: 'gray-900',
  desktopSpacing: 14,
  desktopPaddingX: 4,
  desktopPaddingY: 3,
  activeIndicatorColor: 'indigo-600',
  activeIndicatorHeight: '3px',
  activeIndicatorWidth: '4/5',
  activeIndicatorRounded: 'full',
  ctaSpacing: 8,
  ctaPrimarySizeX: 8,
  ctaPrimarySizeY: 4,
  ctaPrimaryRounded: 'xl',
  ctaPrimaryColorFrom: 'indigo-600',
  ctaPrimaryColorTo: 'indigo-500',
  ctaPrimaryTextColor: 'white',
  ctaPrimaryIconSizeWidth: 5,
  ctaPrimaryIconSizeHeight: 5,
  mobileMenuButtonPadding: 4,
  mobileMenuButtonSizeHeight: 8,
  mobileMenuButtonSizeWidth: 8,
  mobileMenuBackground: 'white/95',
  mobileMenuBorder: 'gray-200',
  mobileMenuSectionSpacing: 6,
};

export const containerStyleSlice = createSlice({
  name: 'containerStyle',
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setTextAlign: (state, action) => {
      state.textAlign = action.payload;
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload;
    },
    setLetterSpacing: (state, action) => {
      state.letterSpacing = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
    setObjectFit: (state, action) => {
      state.objectFit = action.payload;
    },
    setPadding: (state, action) => {
      state.padding = action.payload;
    },
    setMargin: (state, action) => {
      state.margin = action.payload;
    },
    setBoxShadow: (state, action) => {
      state.boxShadow = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setBorderStyle: (state, action) => {
      state.borderStyle = action.payload;
    },
    setHeaderBackground: (state, action) => {
      state.headerBackground = action.payload;
    },
    setHeaderBorder: (state, action) => {
      state.headerBorder = action.payload;
    },
    setShadowDefault: (state, action) => {
      state.shadowDefault = action.payload;
    },
    setHeaderPaddingX: (state, action) => {
      state.headerPaddingX = action.payload;
    },
    setHeaderHeight: (state, action) => {
      state.headerHeight = action.payload;
    },
    setLogoSrc: (state, action) => {
      state.logoSrc = action.payload;
    },
    setLogoAlt: (state, action) => {
      state.logoAlt = action.payload;
    },
    setLogoSizeHeight: (state, action) => {
      state.logoSizeHeight = action.payload;
    },
    setLogoSizeWidth: (state, action) => {
      state.logoSizeWidth = action.payload;
    },
    setBrandName: (state, action) => {
      state.brandName = action.payload;
    },
    setTextSize: (state, action) => {
      state.textSize = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setDesktopSpacing: (state, action) => {
      state.desktopSpacing = action.payload;
    },
    setDesktopPaddingX: (state, action) => {
      state.desktopPaddingX = action.payload;
    },
    setDesktopPaddingY: (state, action) => {
      state.desktopPaddingY = action.payload;
    },
    setActiveIndicatorColor: (state, action) => {
      state.activeIndicatorColor = action.payload;
    },
    setActiveIndicatorHeight: (state, action) => {
      state.activeIndicatorHeight = action.payload;
    },
    setActiveIndicatorWidth: (state, action) => {
      state.activeIndicatorWidth = action.payload;
    },
    setActiveIndicatorRounded: (state, action) => {
      state.activeIndicatorRounded = action.payload;
    },
    setCtaSpacing: (state, action) => {
      state.ctaSpacing = action.payload;
    },
    setCtaPrimarySizeX: (state, action) => {
      state.ctaPrimarySizeX = action.payload;
    },
    setCtaPrimarySizeY: (state, action) => {
      state.ctaPrimarySizeY = action.payload;
    },
    setCtaPrimaryRounded: (state, action) => {
      state.ctaPrimaryRounded = action.payload;
    },
    setCtaPrimaryColorFrom: (state, action) => {
      state.ctaPrimaryColorFrom = action.payload;
    },
    setCtaPrimaryColorTo: (state, action) => {
      state.ctaPrimaryColorTo = action.payload;
    },
    setCtaPrimaryTextColor: (state, action) => {
      state.ctaPrimaryTextColor = action.payload;
    },
    setCtaPrimaryIconSizeWidth: (state, action) => {
      state.ctaPrimaryIconSizeWidth = action.payload;
    },
    setCtaPrimaryIconSizeHeight: (state, action) => {
      state.ctaPrimaryIconSizeHeight = action.payload;
    },
    setMobileMenuButtonPadding: (state, action) => {
      state.mobileMenuButtonPadding = action.payload;
    },
    setMobileMenuButtonSizeHeight: (state, action) => {
      state.mobileMenuButtonSizeHeight = action.payload;
    },
    setMobileMenuButtonSizeWidth: (state, action) => {
      state.mobileMenuButtonSizeWidth = action.payload;
    },
    setMobileMenuBackground: (state, action) => {
      state.mobileMenuBackground = action.payload;
    },
    setMobileMenuBorder: (state, action) => {
      state.mobileMenuBorder = action.payload;
    },
    setMobileMenuSectionSpacing: (state, action) => {
      state.mobileMenuSectionSpacing = action.payload;
    },
    setStyle: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setFontSize,
  setFontFamily,
  setColor,
  setTextAlign,
  setOpacity,
  setLetterSpacing,
  setWidth,
  setHeight,
  setBorderRadius,
  setObjectFit,
  setPadding,
  setMargin,
  setBoxShadow,
  setPosition,
  setBorderStyle,
  setHeaderBackground,
  setHeaderBorder,
  setShadowDefault,
  setHeaderPaddingX,
  setHeaderHeight,
  setLogoSrc,
  setLogoAlt,
  setLogoSizeHeight,
  setLogoSizeWidth,
  setBrandName,
  setTextSize,
  setTextColor,
  setDesktopSpacing,
  setDesktopPaddingX,
  setDesktopPaddingY,
  setActiveIndicatorColor,
  setActiveIndicatorHeight,
  setActiveIndicatorWidth,
  setActiveIndicatorRounded,
  setCtaSpacing,
  setCtaPrimarySizeX,
  setCtaPrimarySizeY,
  setCtaPrimaryRounded,
  setCtaPrimaryColorFrom,
  setCtaPrimaryColorTo,
  setCtaPrimaryTextColor,
  setCtaPrimaryIconSizeWidth,
  setCtaPrimaryIconSizeHeight,
  setMobileMenuButtonPadding,
  setMobileMenuButtonSizeHeight,
  setMobileMenuButtonSizeWidth,
  setMobileMenuBackground,
  setMobileMenuBorder,
  setMobileMenuSectionSpacing,
  setStyle,
} = containerStyleSlice.actions;

export default containerStyleSlice.reducer;
