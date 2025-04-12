import { MainStateType } from "../_context/MainContext";
import { MainActionType } from "../_context/MainContext";
import { Dispatch, RefObject } from "react";
// import ThemeService from "./theme.service"

class displayService {
	mainDispatch: Dispatch<MainActionType> | null = null;

	/* Required for theme switching */
	// appRef: RefObject<HTMLDivElement | null> | null = null
	// theme: 'light' | 'dark' = 'dark'
	/* Required for theme switching */

	constructor() {
		/* Log class initialization */
		// logInit && log(...msg('Init'))
	}

	setLocalDispatch(dispatch: Dispatch<MainActionType>) {
		this.mainDispatch = dispatch;
	}

	dispatch(payload: Partial<MainStateType>) {
		if (this.mainDispatch) {
			this.mainDispatch({ payload });
		}
	}

	setHistorical(prevData: any, data: any) {
		// console.log(
		// 	"***\n%cTRACE: setHistorical",
		// 	"color: green; font-weight: 900"
		// );
		// console.log(prevData);
		// console.log(data);
		const payload = {
			historicData: data,
		};
		if (this.mainDispatch) {
			this.mainDispatch({ payload });
		}
	}
	// toggleTheme() {
	//     this.theme = this.theme === 'dark' ? 'light' : 'dark'
	//     const payload: Partial<MainStateType> = {
	//         theme: this.theme
	//     }
	//     this.dispatch(payload)
	//     ThemeService.applyTheme(this.theme, this.appRef)
	// }
}

const DisplayService = new displayService();

export default DisplayService;
