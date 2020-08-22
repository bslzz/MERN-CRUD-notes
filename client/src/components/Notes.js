import React from 'react';
import Header from './Notes/Nav';
import Home from './Notes/Home';
import CreateNote from './Notes/CreateNote';
import EditNote from './Notes/EditNote';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Notes = ({ setIsLogin }) => {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={CreateNote} />
            <Route path="/edit/:id" component={EditNote} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default Notes;
