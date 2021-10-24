import {BrowserRouter,Route, Switch} from 'react-router-dom'

import {Home} from './pages/Home'
import { NewRoom } from './pages/NewRoom';

import {AuthcontextProvider} from './contexts/AutoContexts';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdimRoom';

function App() {
  return (
    <BrowserRouter>
    <AuthcontextProvider>

    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/roons/new"  component={NewRoom}/>
      <Route path="/roons/:id" component={Room}/>

      <Route path="/admin/roons/:id" component={AdminRoom}/>
        
    </Switch>
    </AuthcontextProvider>
    </BrowserRouter>
  );
}

export default App;
