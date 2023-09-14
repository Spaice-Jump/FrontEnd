import Header from "./utils/Header";
import Footer from "./utils/Footer";


const Layout = ({children}) => {
    return (
      <div className="layaud">
        <Header />
        <main className="mainLayaud">
          {children}
        </main>
       <Footer/>
      </div>
    );
  };
  export default Layout;