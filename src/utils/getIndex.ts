export function getPrevIdx(arr: any[], currentIdx: number): number {
    return currentIdx === 0 ? arr.length - 1 : currentIdx - 1;
};

export function getNextIdx(arr: any[], currentIdx: number): number {
    return currentIdx === arr.length - 1 ? 0 : currentIdx + 1;
};