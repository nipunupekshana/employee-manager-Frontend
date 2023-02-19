import Head from "next/head";
import { Provider, useSelector } from "react-redux";
import { wrapper } from "../store/store";
import SSRProvider from "react-bootstrap/SSRProvider";
import Layout from "../components/layout/layout";
import Toast from "../components/Custom/CustomToast";
import Overlay from "../components/ui/Overlay";
import searchContext from "../context/searchContext";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

function App({ Component, ...rest }) {
  const search = ["First,Last Name", "Email", "Gender", "Phone"];
  const { store, props } = wrapper.useWrappedStore(rest);
  const { userLoading } = useSelector((state) => state.user);
  const { pageProps } = props;
  return (
    <SSRProvider>
      <searchContext.Provider value={search}>
        <Provider store={store}>
          {userLoading && <Overlay />}
          <Toast />
          <Layout>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </searchContext.Provider>
    </SSRProvider>
  );
}

export default wrapper.withRedux(App);
