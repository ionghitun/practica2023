import { useComponentDefaultProps, UnstyledButton, Box, ChevronIcon } from '@mantine/core';
import { clamp } from '@mantine/hooks';
import useEmblaCarousel from 'embla-carousel-react';
import React, { forwardRef, useState, useCallback, useEffect, Children } from 'react';
import { CarouselProvider } from './Carousel.context.js';
import useStyles from './Carousel.styles.js';
import { CarouselSlide } from './CarouselSlide/CarouselSlide.js';
import { getChevronRotation } from './get-chevron-rotation.js';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps = {
  controlSize: 26,
  controlsOffset: "sm",
  slideSize: "100%",
  slideGap: 0,
  orientation: "horizontal",
  align: "center",
  slidesToScroll: 1,
  includeGapInSize: true,
  draggable: true,
  dragFree: false,
  loop: false,
  speed: 10,
  initialSlide: 0,
  inViewThreshold: 0,
  withControls: true,
  withIndicators: false,
  skipSnaps: false,
  containScroll: "",
  withKeyboardEvents: true
};
const _Carousel = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Carousel", defaultProps, props), {
    children,
    className,
    getEmblaApi,
    onNextSlide,
    onPreviousSlide,
    onSlideChange,
    nextControlLabel,
    previousControlLabel,
    controlSize,
    controlsOffset,
    classNames,
    styles,
    unstyled,
    slideSize,
    slideGap,
    orientation,
    height,
    align,
    slidesToScroll,
    includeGapInSize,
    draggable,
    dragFree,
    loop,
    speed,
    initialSlide,
    inViewThreshold,
    withControls,
    withIndicators,
    plugins,
    nextControlIcon,
    previousControlIcon,
    breakpoints,
    skipSnaps,
    containScroll,
    withKeyboardEvents,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "className",
    "getEmblaApi",
    "onNextSlide",
    "onPreviousSlide",
    "onSlideChange",
    "nextControlLabel",
    "previousControlLabel",
    "controlSize",
    "controlsOffset",
    "classNames",
    "styles",
    "unstyled",
    "slideSize",
    "slideGap",
    "orientation",
    "height",
    "align",
    "slidesToScroll",
    "includeGapInSize",
    "draggable",
    "dragFree",
    "loop",
    "speed",
    "initialSlide",
    "inViewThreshold",
    "withControls",
    "withIndicators",
    "plugins",
    "nextControlIcon",
    "previousControlIcon",
    "breakpoints",
    "skipSnaps",
    "containScroll",
    "withKeyboardEvents",
    "variant"
  ]);
  const { classes, cx, theme } = useStyles({ controlSize, controlsOffset, orientation, height, includeGapInSize, breakpoints, slideGap }, { name: "Carousel", classNames, styles, unstyled, variant });
  const [emblaRefElement, embla] = useEmblaCarousel({
    axis: orientation === "horizontal" ? "x" : "y",
    direction: orientation === "horizontal" ? theme.dir : void 0,
    startIndex: initialSlide,
    loop,
    align,
    slidesToScroll,
    draggable,
    dragFree,
    speed,
    inViewThreshold,
    skipSnaps,
    containScroll
  }, plugins);
  const [selected, setSelected] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  const handleScroll = useCallback((index) => embla && embla.scrollTo(index), [embla]);
  const handleSelect = useCallback(() => {
    if (!embla)
      return;
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    onSlideChange == null ? void 0 : onSlideChange(slide);
  }, [embla, setSelected]);
  const handlePrevious = useCallback(() => {
    embla == null ? void 0 : embla.scrollPrev();
    onPreviousSlide == null ? void 0 : onPreviousSlide();
  }, [embla]);
  const handleNext = useCallback(() => {
    embla == null ? void 0 : embla.scrollNext();
    onNextSlide == null ? void 0 : onNextSlide();
  }, [embla]);
  const handleKeydown = useCallback((event) => {
    if (withKeyboardEvents) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      }
    }
  }, [embla]);
  useEffect(() => {
    if (embla) {
      getEmblaApi == null ? void 0 : getEmblaApi(embla);
      handleSelect();
      setSlidesCount(embla.scrollSnapList().length);
      embla.on("select", handleSelect);
      return () => {
        embla.off("select", handleSelect);
      };
    }
    return void 0;
  }, [embla, slidesToScroll]);
  useEffect(() => {
    if (embla) {
      embla.reInit();
      setSlidesCount(embla.scrollSnapList().length);
      setSelected((currentSelected) => clamp(currentSelected, 0, Children.toArray(children).length - 1));
    }
  }, [Children.toArray(children).length, slidesToScroll]);
  const canScrollPrev = (embla == null ? void 0 : embla.canScrollPrev()) || false;
  const canScrollNext = (embla == null ? void 0 : embla.canScrollNext()) || false;
  const indicators = Array(slidesCount).fill(0).map((_, index) => /* @__PURE__ */ React.createElement(UnstyledButton, {
    key: index,
    "data-active": index === selected || void 0,
    className: classes.indicator,
    "aria-hidden": true,
    tabIndex: -1,
    onClick: () => handleScroll(index)
  }));
  return /* @__PURE__ */ React.createElement(CarouselProvider, {
    value: {
      slideGap,
      slideSize,
      embla,
      orientation,
      includeGapInSize,
      breakpoints,
      classNames,
      styles,
      unstyled,
      variant
    }
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref,
    onKeyDownCapture: handleKeydown
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.viewport,
    ref: emblaRefElement
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.container
  }, children)), withIndicators && /* @__PURE__ */ React.createElement("div", {
    className: classes.indicators
  }, indicators), withControls && /* @__PURE__ */ React.createElement("div", {
    className: classes.controls
  }, /* @__PURE__ */ React.createElement(UnstyledButton, {
    onClick: handlePrevious,
    className: classes.control,
    "aria-label": previousControlLabel,
    "data-inactive": !canScrollPrev || void 0,
    tabIndex: canScrollPrev ? 0 : -1
  }, typeof previousControlIcon !== "undefined" ? previousControlIcon : /* @__PURE__ */ React.createElement(ChevronIcon, {
    style: {
      transform: `rotate(${getChevronRotation({
        dir: theme.dir,
        orientation,
        direction: "previous"
      })}deg)`
    }
  })), /* @__PURE__ */ React.createElement(UnstyledButton, {
    onClick: handleNext,
    className: classes.control,
    "aria-label": nextControlLabel,
    "data-inactive": !canScrollNext || void 0,
    tabIndex: canScrollNext ? 0 : -1
  }, typeof nextControlIcon !== "undefined" ? nextControlIcon : /* @__PURE__ */ React.createElement(ChevronIcon, {
    style: {
      transform: `rotate(${getChevronRotation({
        dir: theme.dir,
        orientation,
        direction: "next"
      })}deg)`
    }
  })))));
});
_Carousel.Slide = CarouselSlide;
_Carousel.displayName = "@mantine/carousel/Carousel";
const Carousel = _Carousel;

export { Carousel, _Carousel };
//# sourceMappingURL=Carousel.js.map
