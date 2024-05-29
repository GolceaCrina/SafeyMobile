import React, {createContext, useReducer, ReactNode} from 'react';

type State = {
  count: number;
};

type Action = {type: 'INCREMENT'} | {type: 'DECREMENT'};

const initialState: State = {
  count: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + 1};
    case 'DECREMENT':
      return {...state, count: state.count - 1};
    default:
      return state;
  }
};

export const GlobalStateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => null});

export const GlobalStateProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalStateContext.Provider>
  );
};
