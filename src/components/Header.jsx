import { useContext } from 'react';
import { meContext, selectedUserContext, sidebarContext } from '../App';

const Header = () => {
    const { showMembers, setShowMembers } = useContext(sidebarContext);
    const {selectedUser} = useContext(selectedUserContext)
    const { me } = useContext(meContext);
    return (
        <div className='flex justify-center flex-col items-center bg-sky-200 p-4 gap-1'>
            <h2 className='hidden md:block'></h2>
            <div className="flex gap-1 md:hidden ">

                <button className='bg-orange-300 px-4 py-2 rounded-md hover:bg-orange-400' onClick={() => setShowMembers(!showMembers)}>Active Users</button>
                {/* <button className='bg-orange-300 px-4 py-2 rounded-md hover:bg-orange-400' onClick={() => setShowGroups(!showGroups)}>Groups</button> */}
            </div>
            <p>{me?.userName} {selectedUser?.userName ? `-> ${selectedUser?.userName}` : ''}</p>
        </div>
    );
};

export default Header;