import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EditInfo from './pages/EditInfo'
import EditPassword from './pages/EditPassword'
import Users from './pages/Users'
import ResetPassword from './pages/ResetPassword'
import ChangePasswordWithCode from './pages/ChangePasswordWithCode'

export default function App() {

  return (
    <BrowserRouter>

    <Switch>

    <Route exact path="/login">
      <Login/>
    </Route>

    <Route exact path="/signup">
      <Signup/>
    </Route>

    <Route exact path="/password/reset">
      <ResetPassword/>
    </Route>

    <Route exact path="/password/reset/:email">
      <ChangePasswordWithCode/>
    </Route>


    <Route exact path="/">
      <Dashboard/>
    </Route>

    <Route exact path="/users">
      <Users/>
    </Route>

    <Route exact path="/profile/:id">
      <Profile/>
    </Route>

    <Route exact path="/profile/edit/info/:id">
      <EditInfo/>
    </Route>

    <Route exact path="/profile/edit/password/:id">
      <EditPassword/>
    </Route>

    <Route>
      <h1>Erro 404: Página Não Encontrada</h1>
    </Route>

    </Switch>

    </BrowserRouter>
  )
}
