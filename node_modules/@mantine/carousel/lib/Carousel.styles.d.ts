/// <reference types="react" />
import { MantineNumberSize } from '@mantine/core';
import { CarouselBreakpoint } from './types';
export interface CarouselStylesParams {
    controlSize: number | string;
    controlsOffset: MantineNumberSize;
    orientation: 'vertical' | 'horizontal';
    height: React.CSSProperties['height'];
    includeGapInSize: boolean;
    breakpoints: CarouselBreakpoint[];
    slideGap: MantineNumberSize;
}
declare const _default: (params: CarouselStylesParams, options?: import("@mantine/core").UseStylesOptions<string>) => {
    classes: {
        root: string;
        viewport: string;
        container: string;
        controls: string;
        control: string;
        indicators: string;
        indicator: string;
    };
    cx: (...args: any) => string;
    theme: import("@mantine/core").MantineTheme;
};
export default _default;
//# sourceMappingURL=Carousel.styles.d.ts.map