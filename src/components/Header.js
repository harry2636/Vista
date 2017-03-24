import React from 'react';
import { Link } from 'react-router';
import { Search } from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io.connect()  

class Header extends React.Component {

    constructor(props) {
        super(props);

        // IMPLEMENT: CREATE A SEARCH STATUS, CHAT STATUS

        this.state = {
            search: false,
            chat: false,
            text: '',
            messages:[]
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
    }

    componentDidMount() {
        socket.on('chat message', this.receiveMessage);
    }

    receiveMessage(message) {
        console.log(message);
        let newMessages = this.state.messages;
        newMessages.push(message);
        this.setState({
            messages: newMessages
        });
    }


    toggleSearch() {
        this.setState({
            search: !this.state.search
        });
    }

    toggleChat() {
        this.setState({
            chat: !this.state.chat
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let message = {
            user : this.props.currentUser,
            text : this.state.text
        }
        socket.emit('chat message', message.user + ": " +  message.text);
        this.setState({ text: '' });
        this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
        return false;
    }

    changeHandler(e) {
        this.setState({ text : e.target.value });
    }

    render() {

        const loginButton = (
            <li>
                <Link to="/login"><i className="material-icons">vpn_key</i></Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}><i className="material-icons">lock_open</i></a>
            </li>
        );

        const chatButton = (
            <li>
                <a onClick={this.toggleChat}><i className="material-icons">chat</i></a>
            </li>
        );

        const chatPopup = (
                <div className="totalbox">
                    <div className="chatbox" ref="chat">
                        <ul id="messages">
                            {this.state.messages.map((message, i) => {
                                                                         return (
                                                                             <li> {message} </li>
                                                                             );
                                                                     })
                            }
                        </ul>
                    </div>
                    <div className="formbox"> 
                        <form onSubmit={this.handleSubmit} action="">
                            <input onChange={this.changeHandler} value={this.state.text} id="m" autoComplete="off" />
                            <button className="waves-effect waves-light btn grey">Send</button>
                        </form>
                    </div>
               </div>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper red darken-1">
                        <Link to="/" className="brand-logo center">VISTA</Link>

                        <ul>
                            <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                        </ul>

                        <div className="right">
                            <ul>
                                { this.props.isLoggedIn ? chatButton : undefined}
                                { this.props.isLoggedIn ? logoutButton : loginButton }
                            </ul>
                        </div>
                    </div>
                </nav>
                    <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        { /* IMPLEMENT: SHOW SEARCH WHEN SEARCH STATUS IS TRUE */}
                        {this.state.search ? <Search onClose={this.toggleSearch}
                        onSearch={this.props.onSearch}
                        usernames={this.props.usernames}/> : undefined }
                    </ReactCSSTransitionGroup>
                    { this.state.chat ? chatPopup : undefined }
            </div>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    usernames: React.PropTypes.array
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");},
    usernames: []
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
    };  
};
//export default Header;
export default connect(mapStateToProps)(Header);
