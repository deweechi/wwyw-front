import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';


class MyApp extends App {

    //Need to expose pagenation in nextjs
    static async getInitialProps({ Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        //Expose the qury to the visitor
        pageProps.query = ctx.query;
        return { pageProps };
    }
    render() {
        const { Component, apollo, pageProps } = this.props;

        return(
            <Container>
                <ApolloProvider client={apollo}>
                <Page>
                <Component {...pageProps}/>
                </Page>
                </ApolloProvider>
            </Container>
        );
    }

}

export default withData(MyApp);