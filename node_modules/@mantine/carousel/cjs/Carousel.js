'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@mantine/core');
var hooks = require('@mantine/hooks');
var useEmblaCarousel = require('embla-carousel-react');
var React = require('react');
var Carousel_context = require('./Carousel.context.js');
var Carousel_styles = require('./Carousel.styles.js');
var CarouselSlide = require('./CarouselSlide/CarouselSlide.js');
var getChevronRotation = require('./get-chevron-rotation.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var useEmblaCarousel__default = /*#__PURE__*/_interopDefaultLegacy(useEmblaCarousel);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const _Carousel = React.forwardRef((props, ref) => {
  const _a = core.useComponentDefaultProps("Carousel", defaultProps, props), {
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
  const { classes, cx, theme } = Carousel_styles['default']({ controlSize, controlsOffset, orientation, height, includeGapInSize, breakpoints, slideGap }, { name: "Carousel", classNames, styles, unstyled, variant });
  const [emblaRefElement, embla] = useEmblaCarousel__default({
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
  const [selected, setSelected] = React.useState(0);
  const [slidesCount, setSlidesCount] = React.useState(0);
  const handleScroll = React.useCallback((index) => embla && embla.scrollTo(index), [embla]);
  const handleSelect = React.useCallback(() => {
    if (!embla)
      return;
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    onSlideChange == null ? void 0 : onSlideChange(slide);
  }, [embla, setSelected]);
  const handlePrevious = React.useCallback(() => {
    embla == null ? void 0 : embla.scrollPrev();
    onPreviousSlide == null ? void 0 : onPreviousSlide();
  }, [embla]);
  const handleNext = React.useCallback(() => {
    embla == null ? void 0 : embla.scrollNext();
    onNextSlide == null ? void 0 : onNextSlide();
  }, [embla]);
  const handleKeydown = React.useCallback((event) => {
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
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (embla) {
      embla.reInit();
      setSlidesCount(embla.scrollSnapList().length);
      setSelected((currentSelected) => hooks.clamp(currentSelected, 0, React.Children.toArray(children).length - 1));
    }
  }, [React.Children.toArray(children).length, slidesToScroll]);
  const canScrollPrev = (embla == null ? void 0 : embla.canScrollPrev()) || false;
  const canScrollNext = (embla == null ? void 0 : embla.canScrollNext()) || false;
  const indicators = Array(slidesCount).fill(0).map((_, index) => /* @__PURE__ */ React__default.createElement(core.UnstyledButton, {
    key: index,
    "data-active": index === selected || void 0,
    className: classes.indicator,
    "aria-hidden": true,
    tabIndex: -1,
    onClick: () => handleScroll(index)
  }));
  return /* @__PURE__ */ React__default.createElement(Carousel_context.CarouselProvider, {
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
  }, /* @__PURE__ */ React__default.createElement(core.Box, __spreadValues({
    className: cx(classes.root, className),
    ref,
    onKeyDownCapture: handleKeydown
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.viewport,
    ref: emblaRefElement
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.container
  }, children)), withIndicators && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.indicators
  }, indicators), withControls && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.controls
  }, /* @__PURE__ */ React__default.createElement(core.UnstyledButton, {
    onClick: handlePrevious,
    className: classes.control,
    "aria-label": previousControlLabel,
    "data-inactive": !canScrollPrev || void 0,
    tabIndex: canScrollPrev ? 0 : -1
  }, typeof previousControlIcon !== "undefined" ? previousControlIcon : /* @__PURE__ */ React__default.createElement(core.ChevronIcon, {
    style: {
      transform: `rotate(${getChevronRotation.getChevronRotation({
        dir: theme.dir,
        orientation,
        direction: "previous"
      })}deg)`
    }
  })), /* @__PURE__ */ React__default.createElement(core.UnstyledButton, {
    onClick: handleNext,
    className: classes.control,
    "aria-label": nextControlLabel,
    "data-inactive": !canScrollNext || void 0,
    tabIndex: canScrollNext ? 0 : -1
  }, typeof nextControlIcon !== "undefined" ? nextControlIcon : /* @__PURE__ */ React__default.createElement(core.ChevronIcon, {
    style: {
      transform: `rotate(${getChevronRotation.getChevronRotation({
        dir: theme.dir,
        orientation,
        direction: "next"
      })}deg)`
    }
  })))));
});
_Carousel.Slide = CarouselSlide.CarouselSlide;
_Carousel.displayName = "@mantine/carousel/Carousel";
const Carousel = _Carousel;

exports.Carousel = Carousel;
exports._Carousel = _Carousel;
//# sourceMappingURL=Carousel.js.map
