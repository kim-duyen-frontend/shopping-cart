import '../styles/main.scss'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Provider store={store}><Component {...pageProps} /></Provider>)
}

export default MyApp
