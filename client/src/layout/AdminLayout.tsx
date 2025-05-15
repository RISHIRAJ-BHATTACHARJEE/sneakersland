import type { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const AdminLayout = ({children}: Props) => {
  return (
    <div>
      <header>Admin Dashboard</header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
