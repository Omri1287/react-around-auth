import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import './styles/Login.css';

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setMessage('');
  }

  const handleSubmit = () => {
    e.preventDefault();
    if (password || !username){
      return;
    }
    auth.authorize(username, password)
    .then((data) => {
      if(!data){
        throw new Error('error')
      }
      if (data.jwt){
      // set login
      }
    })
    .then(resetForm)
    .then(() => {
      history.push('/ducks')
    })
    .catch(err => setMessage(err.message));
  }

  return(
    <div className="login">
      <p className="login__welcome">
        Welcome back!
      </p>
      <form onSubmit={this.handleSubmit} className="login__form">
        <label htmlFor="username">
          Username:
        </label>
        <input required id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        <label htmlFor="password">
          Password:
        </label>
        <input required id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="login__button-container">
          <button type="submit" onSubmit={this.handleSubmit} className="login__link">Log in</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ready to begin your journey?</p>
        <Link to="/register" className="signup__link">Sign up</Link>
      </div>
    </div>
  )
}



export default Login;
// class Login extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);

//   }
//   handleChange(e) {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }
//   handleSubmit(e){
//     e.preventDefault();
//     if (!this.state.username || !this.state.password){
//       return;
//     }
//     auth.authorize(this.state.username, this.state.password)
//     .then((data) => {
//       if (data.jwt){
//         this.setState({email: '', password: ''} ,() => {
//         this.props.handleLogin(data.user.en_cal_goal.calGoal);
//         this.props.history.push('/diary');
//         })
//       }
//     })
//     .catch(err => console.log(err));
//   }
//   render(){
//     return(
//       <div className="login">
//         <p className="login__welcome">
//           Welcome back!
//         </p>
//         <form onSubmit={this.handleSubmit} className="login__form">
//           <label htmlFor="username">
//             Username:
//           </label>
//           <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
//           <label htmlFor="password">
//             Password:
//           </label>
//           <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
//           <div className="login__button-container">
//             <button type="submit" onSubmit={this.handleSubmit} className="login__link">Log in</button>
//           </div>
//         </form>

//         <div className="login__signup">
//           <p>Ready to begin your journey?</p>
//           <Link to="/register" className="signup__link">Sign up</Link>
//         </div>
//       </div>
//     )
//   }
// }

// export default withRouter(Login);
