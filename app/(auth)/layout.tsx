import Header from "@/components/shared/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-dark-900 text-white">
      <div className="w-full">
        <div className="">
          <Header />
        </div>
        <div className="container-custom mt-4 flex items-center justify-center self-center pt-36 ">
          {children}
        </div>
      </div>
    </main>
  );
};
export default Layout;
