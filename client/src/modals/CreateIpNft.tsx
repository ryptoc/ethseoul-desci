import React, { useContext, useState } from 'react';
import modalContext from '../context/modal/modalContext';
import CustomModal from '../components/CustomModal';

const CreateIpNftModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('createIpNftModal');

    const [checked, setChecked] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    };

    return (
        <CustomModal
            modalName='createIpNftModal'
            className='status-modal warning-modal ipnft'
            overlayClassName='status-modal'
            shouldCloseOnOverlayClick={false}
        >
            <div className='content'>
                <div className='status'>{modalData.status}</div>
                <div
                    className='message'
                    dangerouslySetInnerHTML={{ __html: modalData.message }}
                />
                <label>
                    <span>I understand</span>
                    <input type='checkbox' checked={checked} onChange={handleChange} />
                </label>
                <button onClick={onClose} disabled={!checked}>
                    Confirm
                </button>
            </div>
        </CustomModal>
    );
};

export default CreateIpNftModal;
