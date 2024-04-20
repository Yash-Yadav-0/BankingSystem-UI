import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const CustomAlert = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className='custom-alert'
    >
      {message && <p>{message}</p>}
      <button className='alert-button' onClick={onClose}>Close</button>
    </motion.div>
  );
};

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomAlert;