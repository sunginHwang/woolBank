export const addComma = (num: number): string => {
  const addCommaReg = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(addCommaReg, ',');
};

export const numberToKorean = (num: number): string => {
  if (num < 0) {
    return '';
  }

  const unitWords = ['', '만', '억', '조', '경'];
  const splitUnit = 10000;
  const resultArray: any = [];
  let resultString = '';

  unitWords.forEach((unitWord, index) => {
    let unitResult = (num % Math.pow(splitUnit, index + 1)) / Math.pow(splitUnit, index);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[index] = unitResult;
    }
  })

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(addComma(resultArray[i])) + unitWords[i] + resultString;
  }

  return resultString;
};
