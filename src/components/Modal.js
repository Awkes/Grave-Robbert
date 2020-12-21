/** @jsx jsx */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { jsx } from 'theme-ui';

const id = 'modal-root';

const Modal = ({ children, portal, close }) =>  {
  const [parent, setParent] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setParent(document.getElementById(id));
    modalRef?.current?.focus();
  });
  
  if (portal) return <div id={id} sx={{ position: 'fixed', top: 0, zIndex: 100 }} />;
  
  function onKeyUp(e) {
    if (e.key === 'Escape') close();
  }

  function closeModal({ target }) {
    if (target.nodeName !== 'A') close();
  }

  return children 
    ? parent && createPortal(
      <div
        onClick={closeModal}
        onKeyUp={onKeyUp}
        ref={modalRef}
        role="presentation"
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          backgroundColor: 'rgba(0, 0, 0, .9)',
          animation: 'fadeIn .2s 1',
          '@keyframes fadeIn': {
            '0%': { backgroundColor: 'transparent' },
            '100%': { backgroundColor: 'rgba(0, 0, 0, .9)' },
          }
        }}
        tabIndex="-1"
      >
        <button 
          onClick={close}
          sx={{ 
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: 'transparent',
            color: 'primary',
            fontSize: 5,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {children}
      </div>,
      parent
    )
    : null;
};

export default Modal;

Modal.defaultProps = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  close: PropTypes.func,
  portal: PropTypes.bool,
};

Modal.defaultProps = {
  children: undefined,
  close: null,
  portal: false,
};
