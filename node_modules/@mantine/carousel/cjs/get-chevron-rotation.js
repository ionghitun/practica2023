'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getChevronRotation({ dir, orientation, direction }) {
  if (direction === "previous") {
    return orientation === "horizontal" ? 90 * (dir === "ltr" ? 1 : -1) : -180;
  }
  return orientation === "horizontal" ? 90 * (dir === "ltr" ? -1 : 1) : 0;
}

exports.getChevronRotation = getChevronRotation;
//# sourceMappingURL=get-chevron-rotation.js.map
