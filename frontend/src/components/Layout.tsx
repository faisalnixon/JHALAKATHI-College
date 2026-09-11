import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <Outlet /> {/* // this is where the nested routes will be rendered  like the Home, About, Contact pages, etc. The Outlet component is a placeholder that will render the matched child route component based on the current URL.  */}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;