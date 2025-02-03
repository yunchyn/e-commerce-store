import Footer from "@/components/Footer";
import NavigationBar from "@/components/navbar/NavigationBar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}
