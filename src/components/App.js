import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfileModal from './EditProfileModal'
import EditAvatarModal from './EditAvatarModal'
import DeleteModal from './DeleteModal'
import AddImageModal from './AddImageModal';
import ImagePopup from './ImagePopup';
import {currentUserContext} from '../contexts/CurrentUserContext'
import api from '../Utils/Api'
import Card from './Card'
import Register from './Register' 
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import * as auth from "../Utils/auth";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

function App() {
  const [cards, setCards] = React.useState([])
  const [editProfileModalOpen, setEditProfileModalOpen] = React.useState(false);
  const [editAvatarModalOpen, setEditAvatarModalOpen] = React.useState(false);
  const [addImageModalOpen, setAddImageModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen ] = React.useState(false);
  const [enlargeImage, setEnlargeImage] = useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [imageLink, setImageLink] = React.useState("")
  const [imageTitle, setImageTitle] = React.useState("")
  const [currentUser, setCurrentUser] = React.useState({})
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(false);
  const [email, setEmail] = useState('')
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
	const [isSuccessful, setIsSuccessful] = React.useState(false);


  const history = useHistory();


  React.useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res)
    })
      .then(() => {
        api.getCardList()
        .then((res) => {
            setCards(
                res.map((card) => ({
                    name: card.name,     
                    link: card.link,
                    _id: card._id,
                    likes: card.likes,
                    owner: card.owner,
            })))
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }, [])
  function handleEditProfileClick(){
    setEditProfileModalOpen(true);
  }
  function handleEditAvatarClick(){
    setEditAvatarModalOpen(true)
  }
  function handleAddPlaceClick(){
    setAddImageModalOpen(true)
  }

  function handleCardClick(link, title) {
    setEnlargeImage(true)
    //({link, title})
    setImageLink(link)
    setImageTitle(title)
  }
  function handleDeleteClick(card){
    console.log(currentUser._id === card.owner._id)

    api.removeCard(card._id)
    .then(() => {
      const cardList = cards.filter((c) => (c._id !== card._id))
      setCards(cardList);
    })
    .catch((err) => console.log(err));
  }
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    let likeStatus
    if(isLiked === false){
      likeStatus =api.addLike(card._id)
    }
    else{
      likeStatus = api.deleteLike(card._id)
    }
    likeStatus
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Update the state
      setCards(newCards);
    })
    .catch((err) => console.log(err));
  } 

  function handleUpdateUser({name, about}){
    api.setUserInfo({name, about})
    .then((res) =>{
      console.log(res)
      setCurrentUser(res)
    })
    .then(() => {
      setEditProfileModalOpen(false)
    })
    .catch((err) => console.log(err));
  }
  function  handleUpdateAvatar(avatar) {
    api.setUserAvatar({avatar})
    .then((res) =>{
      setCurrentUser(res)
    })
    .then(() => {
      setEditAvatarModalOpen(false)
    })
    .catch((err) => console.log(err));
  }
   function handleAddPlaceSubmit({name, link}) {
     api.addCard({name, link})
     .then((newCard) => {
       setCards([newCard,...cards])
     })
     .then(() => setAddImageModalOpen(false))
     .catch((err) => console.log(err))
   }
  function closeAllPopups(){
    setEditProfileModalOpen(false)
    setDeleteModalOpen(false)
    setAddImageModalOpen(false)
    setEditAvatarModalOpen(false)
    setSelectedCard(null)
    setEnlargeImage(false)
  }
useEffect(() => {
  let jwt = localStorage.getItem('jwt');

  if (jwt){
    // we're checking the user's token
    auth.checkToken(jwt)
    .then((res) => {
      let userData = {
        username : res.username,
        emil : res.email
      }
      // we're finding the selected user's total calories
      // from the list of possible goals
      setLoggedIn(true)
      setUserData(userData)
      history.push("/diary");
    });
   }
 }, [loggedIn]);
  
 function handleRegistration(email, password) {
  console.log(email, password);
  auth
    .register(email, password)
    .then((res) => {
      console.log(res);
      if (res.statusCode === 400 || !res) {
        setIsSuccessful(false);
        setIsInfoToolTipOpen(true);
      } else {
        setIsSuccessful(true);
        setIsInfoToolTipOpen(true);
        setEmail(email);
        history.push("/signin");
      }
    })
    .catch((err) => console.log(err));
}

 const onSignOut = () =>{
   localStorage.removeItem('jwt');
   setLoggedIn(false);
   history.push('/login');
 }
  function handleLogin (calGoal){
    this.setState({
      loggedIn: true    
    })
  }
  function handleLogout (){
    // finish the log out handler
      this.setState({
      loggedIn: false
    })
  }
  return (
      <div className="page">
        <Router>
          <Switch>
          <currentUserContext.Provider value={currentUser}>

					<Route path="/signin">
						<Header link={"/signup"} text={"Register"} setEmail={setEmail} />
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/signup">
						<Header link={"/signin"} text={"Login"} setEmail={setEmail} />
						<Register handleRegistration={handleRegistration} />
					</Route>
          <Route path="/">
              <Header />
              <Main
                  cards={cards}
                  editProfileModalOpen={editProfileModalOpen}
                  editAvatarModalOpen={editAvatarModalOpen}
                  addImageModalOpen= {addImageModalOpen}
                  deleteModalOpen ={deleteModalOpen}
                  selectedCard = {selectedCard}
                  handleEditProfileClick = {handleEditProfileClick}
                  handleEditAvatarClick = {handleEditAvatarClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleDeleteClick = {(card) => {
                    console.log(card)
                    handleDeleteClick(card)}}
                  handleCardClick = {handleCardClick}
                  handleCardLike = {(card) => {
                    handleCardLike(card)
                  }}
              />
              <EditProfileModal isOpen ={editProfileModalOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
              <EditAvatarModal isOpen={editAvatarModalOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}
    />
              <AddImageModal isOpen={addImageModalOpen} onClose={closeAllPopups} handleAddPlaceSubmit={handleAddPlaceSubmit} />
              <DeleteModal isOpen={deleteModalOpen} onClose={closeAllPopups} />
              <ImagePopup isOpen={enlargeImage} onClose={closeAllPopups} link={imageLink} title={imageTitle} />
              </Route>
            </currentUserContext.Provider>
          </Switch>
        </Router>
      </div>  
  );
}
export default App;
