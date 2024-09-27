import { useContext, useEffect, useState } from 'react';
import { meContext, selectedUserContext } from '../App';
import { socket } from '../SocketWrapper';
import MessageCard from './MessageCard';

const Container = () => {
    const { selectedUser, setSelectedUser } = useContext(selectedUserContext);
    const [messages, setMessages] = useState([]);
    const { me } = useContext(meContext);
    const [disableInput, setDisableInput] = useState(false);
    const [showUserDisconnected, setShowUserDisconnected] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.on("userDisconnected", (userName) => {
                if (userName === selectedUser?.userName) {
                    setDisableInput(true);
                    const chats = JSON.parse(sessionStorage.getItem("chats"));
                    if (chats[userName]) {
                        delete chats[userName];
                        sessionStorage.setItem("chats", JSON.stringify(chats));
                    }
                    setShowUserDisconnected(true);
                    setTimeout(() => {
                        setDisableInput(false);
                        setSelectedUser(null);
                        setShowUserDisconnected(false);
                    }, 1000);
                } else {
                    const chats = JSON.parse(sessionStorage.getItem("chats"));
                    if (chats[userName]) {
                        delete chats[userName];
                        sessionStorage.setItem("chats", JSON.stringify(chats));
                    }
                    // else just delete the chat of this user
                }
            })
        }

        return () => {
            socket.off("userDisconnected")
        }
    }, [selectedUser, setSelectedUser])





    useEffect(() => {
        if (socket) {


            socket.on("receiveUserMessage", (data) => {
                const sender = data.userName;
                const chats = JSON.parse(sessionStorage.getItem("chats"));
                if (chats[data.userName]) {

                    chats[data.userName].messages = [...chats[data.userName].messages, data];
                    sessionStorage.setItem("chats", JSON.stringify(chats));
                } else {
                    chats[data.userName] = { userName: data.userName, messages: [data] };
                    sessionStorage.setItem("chats", JSON.stringify(chats));
                }
                if (sender === selectedUser?.userName) {
                    setMessages([...messages, data])

                }
            })
        }
        return () => {
            socket.off("receiveUserMessage");
        };

    }, [messages, selectedUser?.id])

    useEffect(() => {
        // look for the user in the session storage
        const chats = JSON.parse(sessionStorage.getItem("chats"));
        const messages = chats?.[selectedUser?.userName];
        if (!messages) {
            sessionStorage.setItem("chats", JSON.stringify({ ...chats, [selectedUser?.userName]: { userName: selectedUser?.userName, messages: [] } }));
            setMessages([]);
        } else {
            setMessages(messages.messages)
        }
    }, [selectedUser])


    const [typedMessage, setTypedMessage] = useState("");
    const handleSendMessage = () => {
        const messageObject = { userName: me?.userName, to: selectedUser?.userName, message: typedMessage };
        setMessages([...messages, messageObject]);
        setTypedMessage("");
        const chats = JSON.parse(sessionStorage.getItem("chats"));
        chats[selectedUser?.userName].messages = [...chats[selectedUser?.userName].messages, messageObject];
        sessionStorage.setItem("chats", JSON.stringify(chats));
        socket.emit("sendMessage", messageObject);
    }
    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    useEffect(() => {
        const input = document.getElementById("message");
        if (input) {

            input.focus();
        }
    })

    useEffect(() => {
        const container = document.getElementById("container");
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    })

    return (
        <div className='flex-grow'>
            {
                showUserDisconnected && <div className="h-full w-full flex items-center justify-center">
                <h2>user disconnected from chat</h2>
            </div>
            }
            {
                selectedUser?.userName ? <div>
                    {/* <h1>{selectedUser.userName}</h1> */}
                    <div className="bg-gray-100 relative h-[calc(100vh-104px)] md:h-[calc(100vh-64px)] w-full">
                        <div id="container" className='absolute top-0 left-0 h-[calc(100vh-104px)] md:h-[calc(100vh-64px)] w-full p-2 no-scrollbar overflow-auto pb-12'>

                            {
                                messages.length === 0 ? `This is the start of your message with ${selectedUser?.userName}` : messages.map((m, i) => <MessageCard key={i} message={m} />)
                            }
                        </div>
                        <div className="absolute bottom-0 left-0 flex items-center w-full">
                            <input disabled={disableInput} id="message" className='flex-grow py-2 px-2 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md' value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder='Enter your message' />
                            <button disabled={disableInput} className='px-4 py-2 bg-sky-300 border border-sky-300 rounded-md' onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </div> :
                    <div className="h-full w-full flex items-center justify-center">
                        <h2>select a user to start chat</h2>
                    </div>
            }
        </div>
    );
};

export default Container;