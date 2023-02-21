const soloReducer = (state = { earnings: [], selectedSymbol: '', favorites: [], selectedEarnings: [] }, action) => {
    switch (action.type) {
        case 'SET_EARNINGS':
            return { ...state, earnings: action.payload };
        case 'SET_SELECTED_SYMBOL':
            return { ...state, selectedSymbol: action.payload };
        case 'SUBMIT_SYMBOL':
            console.log('Setting selectedSymbol state to', action.payload);
            return { ...state, selectedSymbol: action.payload };
        case 'SET_FAVORITES':
            return { ...state, favorites: action.payload };
        // case 'ADD_FAVORITE':
        //     const { userId, ticker } = action.payload;
        //     const userFavorites = state.favorites[userId] || [];
        //     if (userFavorites.some((favorite) => favorite.ticker === ticker)) {
        //         return state;
        //     } else {
        //         const updatedFavorites = { ...state.favorites, [userId]: [...userFavorites, { ticker }] };
        //         return { ...state, favorites: updatedFavorites };
        //     }
        case 'SET_SELECTED_EARNINGS':
            const selectedEarnings = state.earnings.filter((earning) => earning.symbol === state.selectedSymbol);
            return { ...state, selectedEarnings };
        default:
            return state;
    }
};

export default soloReducer;