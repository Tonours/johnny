import React from 'react';
import Head from 'next/head';
import 'isomorphic-unfetch';

/* eslint-disable */
const Fragment = React.Fragment;

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://api.johnnyestilmort.com/isjohnnydead');
    const { isDead } = await res.json();
    return { isDead };
  }
  render() {
    const { isDead } = this.props.isDead;
    const style = {
      title: {
        textAlign: 'center',
        margin: '1em',
        lineHeight: '1.4em'
      },
      image: {
        display: 'block',
        margin: '1em auto',
        width: 'auto',
        maxWidth: '100%'
      }
    };

    return (
      <Fragment>
        <Head>
          <title>Johnny est-il mort ? - {isDead ? 'Yep' : 'nop'}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <img style={style.image} src={isDead ? '/static/images/johnny-2.jpg' : '/static/images/johnny.gif'} />
        <h1 style={style.title}>Johnny est-il mort ? {isDead ? "Yep :'(" : "Nop"}</h1>
      </Fragment>
    );
  }
}

/* eslint-enable */
