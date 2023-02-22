const soloReducer = (state = { earnings: [], selectedSymbol: '', favorites: [], selectedEarnings: [], selectedPrice: null }, action) => {
    switch (action.type) {
      case 'SET_EARNINGS':
        return { ...state, earnings: action.payload };
      case 'SET_STOCK_PRICE':
        return { ...state, earnings: action.payload };
      case 'SET_SELECTED_SYMBOL':
        return { ...state, selectedSymbol: action.payload };
      case 'SUBMIT_SYMBOL':
        console.log('Setting selectedSymbol state to', action.payload);
        return { ...state, selectedSymbol: action.payload };
      case 'SET_FAVORITES':
        return { ...state, favorites: action.payload };
      case 'SET_SELECTED_EARNINGS':
        const selectedEarnings = state.earnings.filter((earning) => earning.symbol === state.selectedSymbol);
        return { ...state, selectedEarnings };
      case 'SET_SELECTED_PRICE':
        return { ...state, selectedPrice: action.payload };
      default:
        return state;
    }
  };
  
  export default soloReducer;