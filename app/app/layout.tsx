import Navbar from '../../common/components/Navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}
