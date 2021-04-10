export const toEm = (...pxs: (number | string)[]) => {
  return pxs
    .map((px) => (typeof px === 'number' ? `${(px / 16).toFixed(2)}em` : px))
    .join(' ');
};
