import { useBear } from '../../shared/store/ui.store';

export const Login = () => {
  const bears = useBear((state) => console.log(state));
  console.log(bears);
  return <h1> bears around here...</h1>;
};
