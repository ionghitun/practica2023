import { DefaultProps, MantineNumberSize, Selectors } from '@mantine/core';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { EmblaPluginType } from 'embla-carousel-react';
import React from 'react';
import useStyles, { CarouselStylesParams } from './Carousel.styles';
import { CarouselSlide, CarouselSlideStylesNames } from './CarouselSlide/CarouselSlide';
import { CarouselBreakpoint, CarouselOrientation, Embla } from './types';
export type CarouselStylesNames = CarouselSlideStylesNames | Selectors<typeof useStyles>;
export interface CarouselProps extends DefaultProps<CarouselStylesNames, CarouselStylesParams>, React.ComponentPropsWithRef<'div'> {
    variant?: string;
    /** <Carousel.Slide /> components */
    children?: React.ReactNode;
    /** Called when user clicks next button */
    onNextSlide?(): void;
    /** Called when user clicks previous button */
    onPreviousSlide?(): void;
    /** Called with slide index when slide changes */
    onSlideChange?(index: number): void;
    /** Get embla API as ref */
    getEmblaApi?(embla: Embla): void;
    /** Next control aria-label */
    nextControlLabel?: string;
    /** Previous control aria-label */
    previousControlLabel?: string;
    /** Previous/next controls size */
    controlSize?: number;
    /** Key of theme.spacing or number to set space between next/previous control and carousel boundary */
    controlsOffset?: MantineNumberSize;
    /** Slide width, defaults to 100%, examples: 40rem 50% */
    slideSize?: string | number;
    /** Key of theme.spacing or number to set gap between slides */
    slideGap?: MantineNumberSize;
    /** Control slideSize and slideGap at different viewport sizes */
    breakpoints?: CarouselBreakpoint[];
    /** Carousel orientation, horizontal by default */
    orientation?: CarouselOrientation;
    /** Slides container height, required for vertical orientation */
    height?: React.CSSProperties['height'];
    /** Determines how slides will be aligned relative to the container. Use number between 0-1 to align slides based on percentage, where 0.5 equals 50% */
    align?: 'start' | 'center' | 'end' | number;
    /** Number of slides that should be scrolled with next/previous buttons */
    slidesToScroll?: number | 'auto';
    /** Determines whether gap should be treated as part of the slide size, true by default */
    includeGapInSize?: boolean;
    /** Determines whether carousel can be scrolled with mouse and touch interactions, true by default */
    draggable?: boolean;
    /** Determines whether momentum scrolling should be enabled, false by default */
    dragFree?: boolean;
    /** Enables infinite looping. Automatically falls back to false if slide content isn't enough to loop. */
    loop?: boolean;
    /** Adjusts scroll speed when triggered by any of the methods. Higher numbers enables faster scrolling. */
    speed?: number;
    /** Index of initial slide */
    initialSlide?: number;
    /** Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. For example, 0.5 equals 50%. */
    inViewThreshold?: number;
    /** Determines whether next/previous controls should be displayed, true by default */
    withControls?: boolean;
    /** Determines whether indicators should be displayed, false by default */
    withIndicators?: boolean;
    /** An array of embla plugins */
    plugins?: EmblaPluginType[];
    /** Icon of next control */
    nextControlIcon?: React.ReactNode;
    /** Previous control icon */
    previousControlIcon?: React.ReactNode;
    /** Allow the carousel to skip scroll snaps if it's dragged vigorously. Note that this option will be ignored if the dragFree option is set to true, false by default */
    skipSnaps?: boolean;
    /** Clear leading and trailing empty space that causes excessive scrolling. Use trimSnaps to only use snap points that trigger scrolling or keepSnaps to keep them. */
    containScroll?: 'trimSnaps' | 'keepSnaps' | '';
    /** Determines whether arrow key should switch slides, true by default */
    withKeyboardEvents?: boolean;
}
export declare const _Carousel: any;
export declare const Carousel: ForwardRefWithStaticComponents<CarouselProps, {
    Slide: typeof CarouselSlide;
}>;
//# sourceMappingURL=Carousel.d.ts.map