import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import Button from '../Button/Button';
import LoginModal from '../../../modals/LoginModal';
import RegisterModal from '../../../modals/RegisterModal';
import LogoutModal from '../../../modals/LogoutModal';
import { openModal } from '../../../../features/modal/modalSlice';

const ModalExample = () => {
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const dispatch = useDispatch();
    const modalType = useSelector(state => state.modal.modalType);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Modal Examples</h2>

            {/* Basic Modal */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Basic Modal</h3>
                <Button onClick={() => setIsBasicModalOpen(true)}>Open Basic Modal</Button>

                <Modal isOpen={isBasicModalOpen} onClose={() => setIsBasicModalOpen(false)}>
                    <h2>Basic Modal</h2>
                    <p>This is a basic modal example.</p>
                </Modal>
            </div>

            {/* Content Modal */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Content Modal</h3>
                <Button onClick={() => setIsContentModalOpen(true)}>Open Content Modal</Button>

                <Modal isOpen={isContentModalOpen} onClose={() => setIsContentModalOpen(false)}>
                    <h2>Modal with Content</h2>
                    <p>This modal contains various content:</p>
                    <ul>
                        <li>Lists</li>
                        <li>Paragraphs</li>
                        <li>Other elements</li>
                    </ul>
                    <p>You can close this modal by:</p>
                    <ul>
                        <li>Clicking the X button</li>
                        <li>Pressing Escape key</li>
                        <li>Clicking outside the modal</li>
                    </ul>
                </Modal>
            </div>

            {/* Confirmation Modal */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Confirmation Modal</h3>
                <Button onClick={() => setIsConfirmModalOpen(true)}>Open Confirmation Modal</Button>

                <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
                    <h2>ARE YOU LOGGING OUT?</h2>
                    <p>You can always log back in at my time.</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <Button
                            variant='primary'
                            onClick={() => {
                                console.log('Confirmed!');
                                setIsConfirmModalOpen(false);
                            }}>
                            LOG OUT
                        </Button>
                        <Button variant='outline' onClick={() => setIsConfirmModalOpen(false)}>
                            CANCEL
                        </Button>
                    </div>
                </Modal>
            </div>

            {/* Login Modal Example */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Login Modal</h3>
                <Button onClick={() => dispatch(openModal({ type: 'login' }))}>Open Login Modal</Button>
                {modalType === 'login' && <LoginModal />}
            </div>

            {/* Register Modal Example */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Register Modal</h3>
                <Button onClick={() => dispatch(openModal({ type: 'register' }))}>Open Register Modal</Button>
                {modalType === 'register' && <RegisterModal />}
            </div>

            {/* Logout Modal Example */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Logout Modal</h3>
                <Button onClick={() => dispatch(openModal({ type: 'logout' }))}>Open Logout Modal</Button>
                {modalType === 'logout' && <LogoutModal />}
            </div>
        </div>
    );
};

export default ModalExample;
