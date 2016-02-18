import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import classnames from 'classnames';
import LoginMutation from '../../mutations/loginmutation';

var ChiefIcon = () => {
  return (
    <svg className='fa' viewBox="0 0 380.719 380.719" style={{width: '1em', fill: 'white'}}>
      <g>
        <path d="M250.753,250.602c-15.116,15.708-35.136,25.387-57.164,25.387c-22.604,0-43.129-10.179-58.367-26.619    c-58.285,18.775-68.625,64.809-68.625,82.18c0,22.063,0,49.17,0,49.17h247.524c0,0,0-13.455,0-36.564    C314.122,325.925,307.662,272.386,250.753,250.602z"/>
        <path d="M128.525,111.92v58.57c0,3.793,2.498,6.936,5.914,8.086c0,0.204-0.035,0.372-0.035,0.563    c0,30.575,16.132,56.554,38.713,66.569c0.175,0.094,0.366,0.163,0.546,0.256c1.784,0.744,3.603,1.43,5.473,1.986    c0.384,0.117,0.75,0.244,1.133,0.35c1.714,0.465,3.451,0.824,5.199,1.127c0.488,0.081,0.977,0.197,1.459,0.256    c2.189,0.29,4.403,0.476,6.663,0.476c2.236,0,4.427-0.174,6.599-0.464c0.465-0.059,0.906-0.175,1.337-0.244    c1.777-0.291,3.544-0.651,5.263-1.127c0.326-0.094,0.64-0.209,0.953-0.291c1.905-0.558,3.765-1.231,5.577-1.998    c0.116-0.047,0.232-0.105,0.349-0.163c22.796-9.876,39.108-35.983,39.108-66.732c0-0.087,0-0.168,0-0.25    c4.183-0.599,7.459-4.049,7.459-8.4v-63.031c10.434-5.24,19.218-12.45,24.457-22.308c10.794-20.286,11.631-39.933,2.382-55.328    c-9.225-15.348-27.234-24.138-49.438-24.138c-15.871,0-30.08,6.959-41.723,15.778c-10.387-11.508-30.458-22-51.889-21.442    c-13.844,0.36-33.468,5.484-48.421,27.902c-7.709,11.525-10.067,23.731-7.029,36.25C94.331,87.835,118.399,105.42,128.525,111.92z     M109.975,37.509c8.697-13.037,20.298-19.833,34.456-20.188c15.441-0.36,31.016,7.331,38.499,15.586    c-11.787,11.932-18.915,23.476-19.52,24.486c-2.463,4.066-1.168,9.37,2.91,11.857c4.084,2.475,9.399,1.191,11.886-2.899    c0.262-0.43,26.84-43.367,59.418-43.367c15.977,0,28.582,5.734,34.601,15.737c5.995,9.969,4.984,23.568-2.835,38.301    c-14.326,26.961-75.486,28.054-97.858,26.194c-4.746-0.412-8.946,3.155-9.324,7.913c-0.407,4.764,3.125,8.946,7.889,9.341    c0.959,0.082,7.482,0.593,17.033,0.593c14.569,0,36.157-1.208,55.793-6.937v47.712h-97.086v-54.788    c0-3.155-1.714-6.042-4.462-7.581c-0.313-0.151-30.638-17.283-35.994-39.428C103.515,52.334,105.014,44.956,109.975,37.509z"/>
      </g>
    </svg>
  );
}

export class MobileIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {expand: false};
  }

  render() {
    const user = this.props.user.user;
    return (
      <div>
      <header ref = 'header'>
      <nav className={classnames('nav-list', {expand: this.state.expand})}>
        <div className='float-left' onClick={(e)=>this.setState({expand: !this.state.expand})}><i className="fa fa-bars fa-4x"></i></div>
        <div className='float-right'><AuthButton {...user}/></div>
        <Link to='/' className='mobile-title'>Ambrosia</Link>
        <ul className={classnames('sub-menus')}>
          <li><i className='fa fa-user'/> Profile</li>
          <li><i className='fa fa-cutlery'></i> Restaurants</li>
          <li><ChiefIcon/> Be a Chief</li>
        </ul>
      </nav>
      </header>
      <section ref = 'content' onScroll = {this.contentScroll} className='content'>
        {this.props.children}
      </section>
      </div>
    );
  }
}

const AuthButton = (props) => {
  var _logout = () => {
    console.log('logout');
    Relay.Store.applyUpdate(new LoginMutation({credentials: {pseudo:'', password:''}, user: props}))
  };
  if(props.mail === '') {
    return (
      <Link to = '/register'><i className="fa fa-sign-in fa-4x"></i></Link>
    );
  } else {
    return (
      <i className='fa fa-sign-out fa-4x' onClick={_logout}/>
    );
  }
}

export default Relay.createContainer(MobileIndex, {
  fragments: {
    user: () => Relay.QL`
    fragments on Root {
      user {
        mail,
        name,
        id,
        userID
      }
    }`
  }
})
