import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  console.log(productData);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8080/product");
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    })();
  });

  return (
    <>
      <Toaster />
      <div className="App">
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
