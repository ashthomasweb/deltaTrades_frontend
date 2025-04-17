// class DataAdapter {
//     constructor() {

//     }
// }

export interface HistoricDataPoint {
  '1. open': string
  '2. high': string
  '3. low': string
  '4. close': string
  '5. volume': string
}

export const dataAdapter = (data: any, interval: string) => {
  //   console.log(Object.entries(data))
  const dataEntries = Object.entries(data)

  const rawData = dataEntries[1][1]
  //   console.log(rawData)
  const metaData = dataEntries[0][1]

  //   const dataset = Object.values(rawData[`Time Series (${interval})`])
  console.log(Object.keys(data[`Time Series (${interval})`]))

  const timeStamps = Object.keys(data[`Time Series (${interval})`])
  //   console.log(timeStamps[2])

  const formattedData = Object.entries(rawData).map(
    ([index, tick]: [string, HistoricDataPoint | any], i: number) => {
      return [
        timeStamps[i],
        +tick['1. open'],
        +tick['4. close'],
        +tick['3. low'],
        +tick['2. high'],
        +tick['5. volume'],
      ]
    },
  )

  //   console.log(formattedData)

  function splitData(formattedData: any) {
    const categoryData = []
    const values = []
    const volumes = []
    for (let i = 0; i < formattedData.length; i++) {
      categoryData.push(formattedData[i].splice(0, 1)[0])
      values.push(formattedData[i])
      volumes.push([
        i,
        formattedData[i][4],
        formattedData[i][0] > formattedData[i][1] ? -1 : 1,
      ])
    }
    const result = {
      categoryData: categoryData,
      values: values,
      volumes: volumes,
    }
    return result
  }

  const result = splitData(formattedData)

  return result
}
