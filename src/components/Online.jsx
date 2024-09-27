import { useContext, useEffect, useState } from 'react';
import { meContext, selectedUserContext, sidebarContext } from '../App';
import { socket } from '../SocketWrapper';

const Online = () => {
    const { showMembers, setShowMembers } = useContext(sidebarContext);
    const { setSelectedUser } = useContext(selectedUserContext);
    const { me } = useContext(meContext);

    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if (socket) {

            socket.emit("sendUsers", {});
        }

    })

    useEffect(() => {
        const handleNewUsers = (data) => {
            setOnlineUsers(data); // Update onlineUsers state with new data
        };
        if (socket) {

            socket.on("newUserAdded", handleNewUsers);
        }
        return () => {
            socket.off("newUsersAdded", handleNewUsers);
        };
    }, []);

    useEffect(() => {
        if (socket) {

            socket.on("sendingUsers", (data) => {
                setOnlineUsers(data)
            })
        }
        return () => {
            socket.off("sendingUsers");
        };
    }, []);


    const handleUserClicked = (name) => {
        if (me?.userName === name) {
            return;
        } else {
            setSelectedUser({userName: name})
            if (window.innerWidth < 768 && showMembers) {
                setShowMembers(!showMembers)
            }
        }
    }


    return (
        <div className={`fixed md:static h-[100vh] top-0 left-0 w-full bg-sky-200 z-30 ${showMembers ? 'block' : 'hidden'}`}>

            <div className='h-[100vh] md:h-[calc(50vh-32px)]  overflow-auto'>
                <div className="flex justify-start md:flex-end p-3 w-full">
                    <p className='hidden md:block bg-green-700 rounded-md px-5 py-2 w-full text-white'>Active User: </p>
                    <button className='px-5 py-2 hover:bg-red-600 block md:hidden bg-red-500 text-white rounded-md' onClick={() => setShowMembers(!showMembers)}>close</button>

                </div>
                {
                    Object.keys(onlineUsers).map((user, i) => (
                        <div onClick={() => handleUserClicked(user)} className={`${me?.userName === user ? 'bg-gray-400' : 'bg-sky-300 cursor-pointer hover:bg-sky-400'} px-3 py-1 line-clamp-1 rounded-md  m-2 `} key={i}>{user}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default Online;