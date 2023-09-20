import { useDispatch } from 'react-redux';
import { changeFiler } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <p>
      Filter 
      <input name='filter' onChange={ (event) => dispatch(changeFiler(event.target.value)) } />
    </p>
  )
};

export default Filter