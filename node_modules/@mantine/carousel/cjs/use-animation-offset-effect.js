'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useAnimationOffsetEffect(embla, transitionDuration) {
  React.useEffect(() => {
    if (embla) {
      window.setTimeout(() => {
        embla.reInit();
      }, transitionDuration);
    }
  }, [embla, transitionDuration]);
}

exports.useAnimationOffsetEffect = useAnimationOffsetEffect;
//# sourceMappingURL=use-animation-offset-effect.js.map
