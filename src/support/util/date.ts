export const secondsToTime = (seconds: number): string => {
  const hh = secondsToHour(seconds);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return [hh, mm > 9 ? mm : hh ? '0' + mm : mm || '0', ss > 9 ? ss : '0' + ss].filter((a) => a).join(':');
};

export const secondsToHour = (seconds: number): number => Math.floor(seconds / 3600);

export const diffMonth = (startDay: Date | string, endDay: Date | string): number => {
  if (!startDay || !endDay) {
    return 0;
  }

  const firstDay = new Date(startDay);
  const secondDay = new Date(endDay);

  let diff = (firstDay.getTime() - secondDay.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7 * 4;
  return Math.abs(Math.round(diff)) - 1;
};

/*
 * 두 날짜간의 일수 차이를 구한다
 * */
export const diffDays = (startDay: Date | string, endDay: Date | string): number => {
  if (!startDay || !endDay) {
    return 0;
  }

  const firstDay = new Date(startDay);
  const secondDay = new Date(endDay);

  const timeDiff = Math.abs(firstDay.getTime() - secondDay.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/*
 * 남은 일자를 구해준다. 시작일이 종료일 보다 클경우 남은 날짜는 x
 * */
export const remainDays = (startDay: Date | string, endDay: Date | string): number => {
  if (!startDay || !endDay) {
    return 0;
  }

  const firstTime = new Date(startDay).getTime();
  const secondTime = new Date(endDay).getTime();

  if (firstTime >= secondTime) {
    return 0;
  }

  return diffDays(startDay, endDay);
};

/* 시작일 ~ 종료일까지의 퍼센티지 구하기 */
export const getRemainDatePercentage = (
  startDay: Date | string,
  endDay: Date | string,
  today: Date | string = new Date()
): number => {
  const totalDateCount = remainDays(startDay, endDay);
  const passDateCount = remainDays(startDay, today);
  const remainDate = (passDateCount / totalDateCount) * 100;

  const remainPercent = parseInt(remainDate.toString(), 10);

  if (isNaN(remainPercent)) {
    return 0;
  }

  return remainPercent > 100 ? 100 : remainPercent;
};

export const isDateExpired = (until: string, check: string): boolean => {
  const untilDate = Date.parse(until);
  const checkDate = Date.parse(check);

  return checkDate <= untilDate;
};

export const getKoMonth = (month: number): string => {
  if (month < 12) {
    return `${month}개월`;
  }

  const koYear = `${Math.floor(month / 12)}년`;
  const koMonth = month % 12 === 0 ? '' : `${month % 12}개월`;
  return `${koYear} ${koMonth}`;
};

export const DATE_FORMAT: {
  YYYY_MM_DD: 'YYYY_MM_DD';
  KO_YYYY_MM_DD: 'KO_YYYY_MM_DD';
  KO_MM_DD: 'KO_MM_DD';
  YYYY_MM_DD_TIME: 'YYYY_MM_DD_TIME';
  YYYYMMDD: 'YYYYMMDD';
} = {
  YYYY_MM_DD: 'YYYY_MM_DD', // format : YYYY-MM-DD
  KO_YYYY_MM_DD: 'KO_YYYY_MM_DD', // format : YYYY년 MM월 DD일
  KO_MM_DD: 'KO_MM_DD', // format : MM월 DD일
  YYYY_MM_DD_TIME: 'YYYY_MM_DD_TIME', // format : YYYY-MM-DD hh:mm
  YYYYMMDD: 'YYYYMMDD' // 'YYYYMMDD'
};

// defaultParse : now() YYYY_MM_DD
export const parseDate = (datetime: Date | string = new Date(), parseType = DATE_FORMAT.YYYY_MM_DD) => {
  if (datetime === '') {
    return '';
  }

  if (!datetime) throw new Error('datetime is empty');

  if (typeof parseDatetime[DATE_FORMAT[parseType]] !== 'function') {
    throw new Error(`${parseType} is now allow dateParse type`);
  }

  return parseDatetime[parseType](datetime);
};

const parseDatetime: any = {};
parseDatetime[DATE_FORMAT.YYYY_MM_DD] = (datetime: Date | string): string => {
  const today = new Date(datetime);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

parseDatetime[DATE_FORMAT.KO_YYYY_MM_DD] = (datetime: Date | string): string => {
  const today = new Date(datetime);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
};

parseDatetime[DATE_FORMAT.YYYY_MM_DD_TIME] = (datetime: Date | string): string => {
  const today = new Date(datetime);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const hh = today.getHours().toString().padStart(2, '0');
  const mm = today.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hh}:${mm}`;
};

parseDatetime[DATE_FORMAT.KO_MM_DD] = (datetime: Date | string): string => {
  const today = new Date(datetime);
  return `${today.getMonth() + 1}월 ${today.getDate()}일 `;
};

parseDatetime[DATE_FORMAT.YYYYMMDD] = (datetime: Date | string): string => {
  const today = new Date(datetime);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};
