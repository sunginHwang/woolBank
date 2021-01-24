function hexToRgb(hexType: string) {
  let hex = hexType.replace('#', '');
  let value = hex.match(/[a-f\d]/gi);

  if (value === null) {
    return '0, 0, 0';
  }

  // 헥사값이 세자리일 경우, 여섯자리로.
  if (value.length === 3) {
    hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
  }

  value = hex.match(/[a-f\d]{2}/gi);

  if (value === null) {
    return '0, 0, 0';
  }

  const r = parseInt(value[0], 16);
  const g = parseInt(value[1], 16);
  const b = parseInt(value[2], 16);

  return `${r}, ${g}, ${b}`;
}

export default hexToRgb;
