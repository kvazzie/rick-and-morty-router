import { useNavigate, useHref } from 'react-router';
import { HeroUIProvider } from '@heroui/system';

type Props = { 
    children: React.ReactNode
};

export const UIProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
        { children }
    </HeroUIProvider>
  );
};
