import { css } from '@emotion/react';

export const safeAreaInsetBottom = (value: string) => css`
  bottom: ${value};
  bottom: calc(constant(safe-area-inset-bottom) + ${value});
  bottom: calc(env(safe-area-inset-bottom) + ${value});
`;
