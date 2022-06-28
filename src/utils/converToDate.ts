export const convertToDate = (d: string) => {
    const [day, month, year] = d.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
}