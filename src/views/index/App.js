import React, { Component } from 'react';
import './App.css';
import icon from '../../static/images/icon-webpack.svg';

class App extends Component {
  state = {
    title: 'webpack + ES6 + react 多页面环境搭建'
  }

  componentDidMount() {
    console.log(111)
  }

  render() {
    return (
      <div className="app">
        <p className="title">{this.state.title}</p>
        <ul className="img-usage">
          <li>
            <span>import引入本地图片</span>
            <img src={icon} className="icon-img" />
          </li>
          <li>
            <span>require引入本地图片</span>
            <img src={require('../../static/images/icon-react.svg')} className="icon-img" />
          </li>
          <li>
            <span>css引入背景图片</span>
            <div className="bg-img"></div>
          </li>
        </ul>

        <div><a href="./login.html">前往另一个页面</a></div>
      </div>
    );
  }
}

export default App;