import Header from "./utils/Header";
import Footer from "./utils/Footer";
import ContactSection from "./utils/ContactSection"


const Layout = ({children}) => {
    return (
      <>
        <Header />
          {children}
        <ContactSection />
        <Footer/>
      </>
    );
  };
  export default Layout;