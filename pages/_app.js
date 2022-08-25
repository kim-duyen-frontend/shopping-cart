import '../styles/main.scss'
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Provider store={store}><Component {...pageProps} /></Provider>)
}

export default MyApp
