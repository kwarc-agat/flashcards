import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import Lessons from './components/Lessons/Lessons';
import Lesson from './components/Dashboard/Lesson'
import ModifyLesson from './components/Lessons/ModifyLesson';
import AddLesson from './components/Lessons/AddLesson';


function App() {
  return (
    <div>
      <Header />
      <br/>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/lessons">
            <Lessons />
          </Route>
          <Route path="/lesson/:id"
            render={(props) => <Lesson {...props} />} />
          <Route path="/add">
            <AddLesson />
          </Route>
          <Route path="/edit/:id" 
            render={(props) => <ModifyLesson {...props} />}/>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
