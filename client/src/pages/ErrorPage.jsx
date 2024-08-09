import '../App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Layout } from "antd";
// If I want to use global states...
// import { StoreProvider } from "./utils/GlobalState";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT to every request as an "authorization" header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exist
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

// Connect to Apollo on the client side and allow for info to be cached, save to the variable named client
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ErrorPage() {
  return (
    // Allow client data to be called in the application by passing it as a property
    <ApolloProvider client={client}>
      
      {/* <StoreProvider> */}
      <Layout>
        <Navbar />
        <main>
          <h1>404 - Oops! Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </main>
        <Footer />
      </Layout>
    {/* </StoreProvider> */}
    </ApolloProvider>
  );
};

export default ErrorPage;
