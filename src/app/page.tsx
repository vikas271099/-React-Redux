'use client'
import { Provider } from "react-redux";
import Homepage from "./components/Homepage";
import { store } from "./store/store";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Provider store={store}>
      <Homepage Items={"available"}/>
      </Provider>
     
    </>
  );
}
