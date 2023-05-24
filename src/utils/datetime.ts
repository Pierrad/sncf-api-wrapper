export function secondsToHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  return `${h}h ${m}m ${s}s`;
}

export function isoDateTimeToDate(iso_date: string): Date {
  const year = iso_date.slice(0, 4);
  const month = iso_date.slice(4, 6);
  const day = iso_date.slice(6, 8);
  const hour = iso_date.slice(9, 11);
  const minute = iso_date.slice(11, 13);
  const second = iso_date.slice(13, 15);
  return new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
}

export function differenceInSecs(date1: Date, date2: Date): number {
  return Math.abs(date1.getTime() - date2.getTime()) / 1000;
}