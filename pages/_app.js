import '../styles/main.scss'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />)
}

export default MyApp
