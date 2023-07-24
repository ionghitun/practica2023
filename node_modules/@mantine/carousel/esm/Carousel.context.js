import { createSafeContext } from '@mantine/utils';
import { CAROUSEL_ERRORS } from './Carousel.errors.js';

const [CarouselProvider, useCarouselContext] = createSafeContext(CAROUSEL_ERRORS.context);

export { CarouselProvider, useCarouselContext };
//# sourceMappingURL=Carousel.context.js.map
