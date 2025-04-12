import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

interface CandleStickProps {
	messages: any[];
}

interface HistoricDataPoint {
    "1. open": string
    "2. high": string
    "3. low": string
    "4. close": string
    "5. volume": string
}

const Candlestick: React.FC<CandleStickProps> = (props: CandleStickProps) => {
	const [data, setData] = useState<any>(null);
	const [metaData, setMetaData] = useState<any>(null);

	const upColor = "#00da3c";
	const downColor = "#ec0000";

	useEffect(() => {
		console.log(props.messages);
		if (props.messages.length > 1) {
			// console.log(props.messages)
			setMetaData(props.messages[1]?.data["Meta Data"]);
			const dataset = Object.values(
				props.messages[1]?.data["Time Series (60min)"]
			);
            console.log(dataset)
			const formattedData = dataset.map(
				(tick: HistoricDataPoint | any) => {
					return [
						+tick['1. open'],
						+tick['4. close'],
						+tick['3. low'],
						+tick['2. high'],
						+tick['5. volume'],
					];
				}
			);
			console.log(formattedData);
			setData(formattedData)
		}
	}, [props.messages]);

	const options = {
		grid: { top: 8, right: 8, bottom: 24, left: 36 },
		xAxis: {
			type: "time",
			name: "Date",
			// data: data,
		},
		yAxis: {
			type: "value",
			name: "Price",
		},
		series: [
			{
				data: data,
				type: "candlestick",
				// name: metaData.symbol,
				itemStyle: {
					color: upColor,
					color0: downColor,
					borderColor: undefined,
					borderColor0: undefined,
				},

				// smooth: true,
			},
		],
		tooltip: {
			trigger: "axis",
		},
	};

	// console.log(options);

	return (
		<div style={{ width: 1000, height: 1000 }}>
			{props.messages.length > 1 ? (
				<ReactECharts option={options} />
			) : null}
		</div>
	);
};

export default Candlestick;
