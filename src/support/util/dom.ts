export const isTopArea = () => {
  return window.scrollY !== 0;
}

export const disableScroll = () => {
  document.body.style.overflow = 'hidden';
}

export const enableScroll = () => {
  document.body.style.overflow = '';
}
