import type { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const PrivateLayout = ({children}: Props) => {
  return (
    <div>
      <header>User Header</header>
      <main>
        {children}
      </main>
      <footer>User Footer</footer>
    </div>
  );
};

export default PrivateLayout;
