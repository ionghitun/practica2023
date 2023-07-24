import { CarouselOrientation } from './types';
interface Options {
    dir: 'rtl' | 'ltr';
    orientation: CarouselOrientation;
    direction: 'next' | 'previous';
}
export declare function getChevronRotation({ dir, orientation, direction }: Options): number;
export {};
//# sourceMappingURL=get-chevron-rotation.d.ts.map