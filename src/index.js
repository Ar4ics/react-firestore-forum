import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Posts from './Posts';
import PostDetails from "./PostDetails";
import {
    BrowserRouter,
    Route,
    Switch,
    NavLink
} from 'react-router-dom'


const Home = () => (
    <div className="pure-g block text-center">
        <div className="pure-u-1">
            <h1>Добро пожаловать на форум по компьютерным играм!</h1>
        </div>
    </div>
);

const Header = () => (

    <div className="pure-menu pure-menu-horizontal">
        <ul className="pure-menu-list">
            <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to='/'>Главная страница</NavLink>
            </li>
            <li className="pure-menu-item">
                <NavLink className="pure-menu-link" to='/posts'>Игры</NavLink>
            </li>
        </ul>
    </div>
);

const Topics = () => (
    <Switch>
        <Route exact path='/posts' component={Posts}/>
        <Route path='/posts/:postId' component={PostDetails}/>
    </Switch>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/posts' component={Topics}/>
        </Switch>
    </main>
);


const App = () => (
    <div>
        <Header/>
        <Main/>
    </div>
);

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
