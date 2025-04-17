import {
  JSX,
  Dispatch,
  ReactNode,
  createContext,
  useReducer,
  useEffect,
  useRef,
  RefObject,
} from 'react'
import DisplayService from '../services/display.service'

export type MainStateType = {
  userName: string | null
  userObj: unknown | null
  theme: 'day' | 'night'
  historicData: any
  savedData: string[]
}

export type MainActionType = {
  type?: string
  payload?: Partial<MainStateType>
}

type MainContextType = {
  mainState: MainStateType
  mainDispatch: Dispatch<MainActionType>
}

type MainProviderProps = {
  children: ReactNode
}

export const MainState: MainStateType = {
  userName: null,
  userObj: null,
  theme: 'night',
  historicData: null,
  savedData: ['TSLA-compact-April', 'IBM-full-May', 'AAPL-compact-June'],
}

export const MainContext = createContext<MainContextType>({
  mainState: MainState,
  mainDispatch: () => {},
})

const MainReducer = (state: MainStateType, action: MainActionType) => {
  try {
    // ContextValidator.validate(action.payload, initialMainState, 'MainContext')
    return {
      ...state,
      ...action.payload,
    }
  } catch (error) {
    console.error(error)
    return {
      ...state,
    }
  }
}

const MainProvider = ({ children }: MainProviderProps): JSX.Element => {
  // logInit && logComponentInit(file)

  const [mainState, mainDispatch] = useReducer(MainReducer, MainState)
  const appRef = useRef<HTMLDivElement | null>(null)

  DisplayService.setLocalDispatch(mainDispatch)
  // APIService.setLocalDispatch(mainDispatch)
  // DebugService.setLocalDispatch(mainDispatch)

  // FirebaseAuthService.setLocalDispatch(mainDispatch)
  // FirebaseReadService.setLocalDispatch(mainDispatch)
  // FirebaseUpdateService.setLocalDispatch(mainDispatch)
  // FirebaseDeleteService.setLocalDispatch(mainDispatch)

  // useEffect(() => {
  // DisplayService.appRef = appRef
  // }, [])

  return (
    <MainContext.Provider value={{ mainState, mainDispatch }}>
      <div ref={appRef} className="app-container" data-style="night">
        {children}
      </div>
    </MainContext.Provider>
  )
}

export default MainProvider
