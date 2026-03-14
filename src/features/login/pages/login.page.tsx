import { useBear } from '@/shared/store/ui.store';

export const LoginPage = () => {
  const bears = useBear((state) => console.log(state));
  console.log(bears);
  return <h1> Login</h1>;
};
