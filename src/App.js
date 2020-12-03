import "./App.css"
import  BackDrop  from './components/BackDrop/BackDrop';
import{useState,useEffect} from 'react';
import Navigate from './components/Navigate/Navigate';
import Footer from './components/Footer/Footer';
import BootstrapCarousel from './components/Carousel/BootstrapCarousel' 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
function App() {
  
  //setting States
  let[sideDrawerToggle,setSideDrawerToggle]=useState(false);
  const [user, setUser] = useState({
    userToken: undefined,
    userData: undefined,
  });
  
  
  //Handling Events
  let drawerToggleClickHandler=()=>{
     setSideDrawerToggle(prevState=>sideDrawerToggle=!prevState.sideDrawerToggle)
     console.log(sideDrawerToggle);
  };
  let backDropClickHandler=()=>{
    setSideDrawerToggle(false)
  };
  let backDrop;
  if(sideDrawerToggle===true){
    backDrop=<BackDrop onClick={backDropClickHandler}/>;
  }
  //Checking for Tokens
  useEffect(()=>{
      const searchToken = async ()=>{
          let token =localStorage.getItem("jwt-token");
          if(token===null){
              localStorage.setItem("jwt-token","");
              token = "";
          }
          const validateToken = await axios.post(
              "http://localhost:4000/users/tokenValidate",null,
              {headers:{"jwt-token":token}}
          );
          if(validateToken.data){
              const getUser =await axios.get('http://localhost:4000/users//authorizedUser',
              { headers: { "jwt-token": token }});

              setUser({
                userToken:token,
                userData: getUser.data,  
              }) 
              console.log(user.userData);
             
          }
      }
      searchToken();
      
  },[]);
  let greet;
  if(user.userData)
  { greet=user.userData.name}else{greet=""}
 
  
  return (
    <div className="App" style={{height:'100%'}}>
     <Navigate 
      drawerClickHandler={drawerToggleClickHandler} 
      show={sideDrawerToggle}  
      onClick={backDropClickHandler}
      User={user}
      setUser={setUser}
      greet={greet}
     /> 
     <Footer/>
     {backDrop}
     <main style={{marginTop:'64px'}}>
     </main>
    </div>
  );
}
export default App;
