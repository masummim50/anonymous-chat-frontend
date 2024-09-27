
import Online from './Online';

const Sidebar = () => {
    return (
        <div className='bg-sky-200 h-[100vh] md:h-[100%] flex flex-col w-auto md:w-[250px]'>
            <Online/>
            {/* <Groups/> */}
        </div>
    );
};

export default Sidebar;