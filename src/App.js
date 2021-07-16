
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Room from './components/Room';

const App = () => {
 return(
   <div>
<Router>
  <Route exact path='/' component={Room}/>
  
  

</Router>
   </div>
 )
  
};
export default App;
