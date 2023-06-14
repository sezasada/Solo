const cpiReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_DATA':
        return action.payload;
      case 'UNSET_ALL_DATA':
        return [];
      default:
        return state;
    }
  };
  
  export default cpiReducer;
  