import { useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { useSSR } from "use-ssr";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = () =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        onError: linkError,
      },
    };
  });

let apolloClient: ApolloClient<Event | {}>;

export function createApolloClient(url: string) {
  const link = authLink().concat(
    createHttpLink({ uri: url, credentials: "include" })
  );

  return new ApolloClient({
    link,
    ssrMode: useSSR().isServer,
    uri: url,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any | {}, wpUrl: string) {
  const _apolloClient = apolloClient ?? createApolloClient(wpUrl);
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (useSSR().isServer) {
    return _apolloClient;
  }
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any | {}, wpUrl: string) {
  return useMemo(() => initializeApollo(initialState, wpUrl), [initialState]);
}
