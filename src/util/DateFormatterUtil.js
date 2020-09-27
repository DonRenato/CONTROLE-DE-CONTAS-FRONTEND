export function dataConvert(date){
        date = date.slice(0,10)
        const [year, month, day] = date.split('-')

        return `${day}/${month}/${year}`
    }


