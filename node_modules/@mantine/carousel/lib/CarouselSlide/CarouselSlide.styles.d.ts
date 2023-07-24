import { MantineNumberSize } from '@mantine/core';
import { CarouselOrientation, CarouselBreakpoint } from '../types';
export interface CarouselSlideStylesParams {
    size: string | number;
    gap: MantineNumberSize;
    orientation: CarouselOrientation;
    includeGapInSize: boolean;
    breakpoints: CarouselBreakpoint[];
}
declare const _default: (params: CarouselSlideStylesParams, options?: import("@mantine/core").UseStylesOptions<string>) => {
    classes: {
        slide: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/core").MantineTheme;
};
export default _default;
//# sourceMappingURL=CarouselSlide.styles.d.ts.map