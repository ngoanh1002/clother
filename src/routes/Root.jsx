import Header from "../components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </>
  );
};

export default Root;
