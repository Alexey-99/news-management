import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainSection from "./components/main/MainSection";

const App = () => {
  return (
    <div className="vh-100">
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
};

export default App;