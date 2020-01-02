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
        //Expose the query to the visitor
        pageProps.query = ctx.query;
        pageProps.category = "Pen";
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