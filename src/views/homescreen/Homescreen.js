import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from 'redux/Slices/authSlice';

export default function Homescreen() {
  const dispatch = useDispatch();

  const handleSubmit = (val) => {
    dispatch(login(val));
  };

  return (
    <div>
      <h2>Hello</h2>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
