import { useSelector } from 'react-redux';

const useReduxStore = () => {
  return useSelector((store) => store);
};


export default useReduxStore;
