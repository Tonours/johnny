import React from 'react';
import 'isomorphic-unfetch';

/* eslint-disable */

export default class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:4000/isjohnnydead');
    const { isDead } = await res.json();
    return { isDead };
  }
  render() {
    const { isDead } = this.props.isDead;
    return (
      <div>
        <h1>Is Johnny dead ? {isDead ? 'Yep' : 'nop'}</h1>
      </div>
    );
  }
}

/* eslint-enable */
