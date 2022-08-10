import { useContext } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import modalContext from '../context/modal/modalContext';

const RequestToContributeModal = () => {
    const { closeModal } = useContext(modalContext);

    const onClose = () => closeModal('requestToContributeModal');

    return (
        <CustomModal
            modalName='requestToContributeModal'
            className='request-to-contribute-modal'
        >
            <div className='content'>
                <div className='heading'>
                    <span className='title'>Request to Contribute to Research</span>
                    <span className='note'>
                        Note: You can only accept one researcher!
                    </span>
                </div>
                <div className='milestone-container'>
                    <div className='row header'>
                        <div>Milestone %</div>
                        <div>Amount Unlocked</div>
                        <div>Comments</div>
                        <div>Agreed?</div>
                    </div>
                    <div className='row'>
                        <div>20%</div>
                        <div>3000 USDC</div>
                        <div>abc</div>
                        <div>
                            <input type='checkbox' />
                        </div>
                    </div>
                </div>
                <div className='actions-container'>
                    <Button onClick={onClose} variant='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={onClose} variant='secondary'>
                        Confirm
                    </Button>
                </div>
            </div>
        </CustomModal>
    );
};

export default RequestToContributeModal;
