import React from 'react';
import { DefaultProps, Selectors, MantineNumberSize } from '@mantine/core';
import useStyles from './CarouselSlide.styles';
export type CarouselSlideStylesNames = Selectors<typeof useStyles>;
export interface CarouselSlideProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
    /** Slide content */
    children?: React.ReactNode;
    /** Slide width, defaults to 100%, examples: 40rem, 50% */
    size?: string | number;
    /** Key of theme.spacing or number to set gap between slides */
    gap?: MantineNumberSize;
}
export declare const CarouselSlide: React.ForwardRefExoticComponent<CarouselSlideProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CarouselSlide.d.ts.map