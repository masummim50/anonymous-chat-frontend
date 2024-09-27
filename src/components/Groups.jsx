import  { useContext } from 'react';
import { sidebarContext } from '../App';

const Groups = () => {
    const { showGroups, setShowGroups} = useContext(sidebarContext)
    return (
        <div className={`fixed md:static h-[100vh] top-0 left-0 w-full bg-sky-200 no-scrollbar ${showGroups ? 'block' : 'hidden'}`}>

            <div className='h-[100vh] md:h-[calc(50vh-32px)] bg-indigo-300 overflow-auto no-scrollbar'>
                <button className='p-4 block md:hidden' onClick={() => setShowGroups(!showGroups)}>close</button>
                {
                    Array(30).fill("").map((a, i) => (<div className='p-4' key={i}>some</div>)
                    )
                }
            </div>
        </div>
    );
};

export default Groups;