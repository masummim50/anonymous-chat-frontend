import { useContext } from 'react';
import { meContext } from '../App';
import { motion } from 'framer-motion'

import PropTypes from 'prop-types';

const MessageCard = (props) => {
    const { me } = useContext(meContext);
    return (

        <div className={`flex  ${props.message.userName === me.userName ? 'justify-end' : 'justify-start'} mb-2`}>

            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className={`max-w-[80%] inline-block px-2 py-1  ${props.message.userName === me.userName ? 'bg-gray-300 rounded-t-md rounded-bl-md' : 'bg-sky-300 rounded-t-md rounded-br-md'}`}>
                <p>{props.message.message}</p>
            </motion.div>
        </div>

    );
};


MessageCard.propTypes = {
    message: PropTypes.shape({
        userName: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired
    }).isRequired
};

export default MessageCard;