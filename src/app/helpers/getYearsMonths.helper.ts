
interface MonthOfYear {
    monthNum: number
    monthName: string
}

const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

export const getMonthsOfYear = () : MonthOfYear[] => {
    const data: MonthOfYear[] = []
    for (let i = 1; i <= 12; i++) {
        data.push({monthNum:i,monthName:meses[i-1]})
    }
    return data
}