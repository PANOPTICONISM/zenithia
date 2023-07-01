export type LineChartProps = {
    result: {
        id: string,
        color: string,
        data: {
            x: string,
            y: number,
        }[]
    }
}

export type PieChartProps = {
    id: string,
    label: string,
    value: number,
    color: string
}[]