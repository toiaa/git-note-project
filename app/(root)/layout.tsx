import RightNavBar from "@/components/shared/NavBar/RightNavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-dark-900 text-white">
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
          {children}
        </section>
        <RightNavBar />
      </div>
    </main>
  );
};
export default Layout;
