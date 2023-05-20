export function secondsToHMS(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    return `${h}h ${m}m ${s}s`;
}

export function isoDateTimeToReadableDate(iso_date: string): string {
    // 20230520T194900 -> 2023-05-20 19:49:00
    const year = iso_date.slice(0, 4);
    const month = iso_date.slice(4, 6);
    const day = iso_date.slice(6, 8);
    const hour = iso_date.slice(9, 11);
    const minute = iso_date.slice(11, 13);
    const second = iso_date.slice(13, 15);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}