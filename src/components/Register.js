import React, {button, useEffect, useState} from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import * as auth from '../Utils/auth';
//import './styles/Register.css';

function Register(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMessage('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword){
      return setMessage('something went wrong')
    }
  
      let {username, password, email} = this.state
      auth.register(username, password, email)
      .then((res) => {
        if(res.stat| res === 400)
         throw new Error('error')
        return res;
      })
      .then(resetForm)
      .then(() => {
        history.push('/ducks')
      })
      .then(() => {
        //make redirect
      })
  
  } 
  useEffect(() => {
    if(localStorage.getItem('jwt')){
        //make redirect to main 
    }
  }, [])
  
  return (
    <div className="register">
      <p className="register__welcome">
          Please register.
      </p>
      <p className="register__error">
          {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">usCode |
        <label htmlFor="username">
          Username:
        </label>
        <input id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <label htmlFor="email">
          Email:
        </label>
        <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">
          Password:
        </label>
        <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <label htmlFor="confirmPassword">
          Confirm password:
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <label htmlFor="calGoal">
          Daily calorie goal:
        </label>
        {/* <select name="calGoal" value={calGoal} onChange={handleChangeCals}>
          {
            data.calData.map((item, i) => {
              return (
                <option value={item.id} key={i}>{item.calGoal}</option>
              )
            })
          }
        </select> */}
        <div className="register__button-container">
          <button type="submit" onSubmit={handleSubmit} className="register__link">Sign up</button>
        </div>
      </form>
  
      <div className="register__signin">
        <p>Already have an account??</p>
        <Link to="login" className="register__login-link">Log in here</Link>
      </div>
      </div>
  );
}

export default Register;
// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//       message: ''
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChangeCals = this.handleChangeCals.bind(this);
//   }
//   handleChange = (e) => {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }
//   handleChangeCals = (e) => {
//     const {name, value} = e.target;
//     this.setState({
//       [name]: value
//     });
//   }
//   handleSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.password === this.state.confirmPassword){
//       auth.register(this.state.username, this.state.password, this.state.email, this.state.calGoal).then((res) => {
//         if(res){
//           this.props.history.push('/login');
//         } else {
//           console.log('Something went wrong.');
//         }
//       });
//     }
//   }
//   render(){
  //   return (
  //     <div className="register">
  //       <p className="register__welcome">
  //           Please register.
  //       </p>
  //       <form onSubmit={this.handleSubmit} className="register__form">
  //         <label htmlFor="username">
  //           Username:
  //         </label>
  //         <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
  //         <label htmlFor="email">
  //           Email:
  //         </label>
  //         <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
  //         <label htmlFor="password">
  //           Password:
  //         </label>
  //         <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
  //         <label htmlFor="confirmPassword">
  //           Confirm password:
  //         </label>
  //         <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
  //         <label htmlFor="calGoal">
  //           Daily calorie goal:
  //         </label>
  //         <select name="calGoal" value={this.state.calGoal} onChange={this.handleChangeCals}>
  //           {
  //             data.calData.map((item, i) => {
  //               return (
  //                 <option value={item.id} key={i}>{item.calGoal}</option>
  //               )
  //             })
  //           }
  //         </select>
  //         <div className="register__button-container">
  //           <button type="submit" onSubmit={this.handleSubmit} className="register__link">Sign up</button>
  //         </div>
  //       </form>

  //       <div className="register__signin">
  //         <p>Already have an account??</p>
  //         <Link to="login" className="register__login-link">Log in here</Link>
  //       </div>
  //       </div>
  // );
//   }

// }

// export default withRouter(Register);
