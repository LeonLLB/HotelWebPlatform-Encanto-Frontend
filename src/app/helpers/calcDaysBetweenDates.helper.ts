export const calcDaysBetweenDates = (date1: Date, date2:Date): number => Math.ceil((date1.getTime()-date2.getTime())/(1000*3600*24))
