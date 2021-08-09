import React, { useEffect, useState, useRef, useContext } from "react"
import io from "socket.io-client";
import axios from 'axios';
import { getToken } from '../../Utils/Common'
import "./Chat.css"
import IMG from '../../images/user.png'
import Loadding from '../../images/typing.gif'
import {Datacontext} from '../../context/contextGlobal'
function Chat(props) {
    const context = useContext(Datacontext);
    const [state, setState] = useState({ message: "", name: "", chatting: false })
    const [chat, setChat] = useState([]);
    const [show, setShow] = useState(false);
    const [receiver, setReceiver] = useState([]);
    const socketRef = useRef()
    const messagesEndRef = useRef(null)
    // const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    // }
    useEffect(
        () => {
            axios.post('http://localhost:7000/getchat').then(response => {
                setChat([...chat, ...response.data]);
            }).catch(err => {
                console.log(err)
            })
        }
        , []
    )
    // useEffect(scrollToBottom, [state.chatting]);
    useEffect(
        () => {
            socketRef.current = io.connect("http://localhost:7000")
            socketRef.current.on("message", (data) => {
                setChat([...chat, ...data]);
            })
            socketRef.current.on('chatting', (data) => {
                setState({ chatting: data })
            })
            socketRef.current.emit("createroom", { iduser: getToken(), idreceive: context.receiver })
            return () => socketRef.current.disconnect()
        },
        [chat]
    )

    const onTextChange = (e) => {
        setState({ message: e.target.value })
    }
    const onMessageSubmit = (e) => {
        const { message } = state;
        socketRef.current.emit("message", { content: message, iduser: getToken(), idreceive:context.receiver })
        e.preventDefault()
        setState({ message: "" })
    }
    const Chatting = (a) => {
        socketRef.current.emit('chatting', a)
    }
    return (
        <React.Fragment>
            <div className="chat">
                <div className="chat__wrapper">
                    <div className="title">
                        <div className="title__text">Simple Online Chat</div>
                        <div className="chat__close" onClick={() => context.showChat(null)}><i class="fas fa-times"></i></div>
                    </div>
                    <div className="form">
                        {chat.map((value, index) =>
                            (value.iduser === getToken()) ?
                                < div key={index} className="user-inbox inbox" >
                                    <div className="msg-header">
                                        <p>{value.content}</p>
                                    </div>
                                </div> :

                                <div className="bot-inbox inbox">
                                    <div className="icon">
                                        <img style={{ height: "100%" }} src={IMG} />
                                    </div>
                                    <div className="msg-header">
                                        <p>{value.content}</p>
                                    </div>
                                </div>
                        )}
                        {state.chatting ? <div style={{ margin: "0px" }} className="bot-inbox inbox">
                            <div className="icon">
                                <img style={{ height: "100%" }} src={IMG} />
                            </div>
                            <div class="typing">
                                <img src={Loadding} alt="" />
                            </div>
                        </div> : <></>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="typing-field">
                        <div className="input-data">
                            <input type="text" name="message" autocomplete="off" value={state.message}
                                placeholder="Type something here..." required
                                onChange={(e) => onTextChange(e)}
                                onBlur={() => Chatting(false)}
                                onFocus={() => Chatting(true)}></input>
                            <button onClick={onMessageSubmit}>Send</button>
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment>
    )
}

export default Chat

