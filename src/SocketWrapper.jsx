import   { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { meContext } from './App';
import { PropTypes } from 'prop-types';


export let socket = null;

const SocketWrapper = (props) => {
    const { me } = useContext(meContext)

    useEffect(() => {
        
       
            // socket = io.connect("http://localhost:3001", {query: { userName: me?.userName }})
            socket = io.connect("https://socket-backend-jt2k.onrender.com", {query: { userName: me?.userName }})
        
    },[ me?.userName, me])

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            socket.emit("manualDisconnect", me?.userName)
            sessionStorage.removeItem("chats")
        })
    })


    useEffect(() => {
        const handleReconnect = () => {
            socket.emit("userReconnected", me?.userName);
        };

        socket.on("reconnect", handleReconnect);

        return () => {
            socket.off("reconnect", handleReconnect);
        };
    }, [me?.userName]);
    return (
        <div>
            {props.children}
        </div>
    );
};

SocketWrapper.propTypes = {
    children: PropTypes.node
}

export default SocketWrapper;