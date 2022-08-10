import React, { FormEvent, useContext, useState } from 'react';
import Button from '../../components/Button';
import Dropzone from '../../components/Dropzone';
import modalContext from '../../context/modal/modalContext';

const initialState = {
    name: '',
    description: '',
};

const SubmissionLog = () => {
    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState<File[]>([]);

    const { openModal, setModalData } = useContext(modalContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image.length) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message: 'Cover photo for ipNFT is required',
            }));
            return;
        }

        openModal('warningModal');
        setModalData((prev) => ({
            ...prev,
            status: 'Notice',
            message:
                'You are about to unlock the Milestone Escrow. Please ensure that you have reviewed all documents and the milestone objectives are completed to a sufficient standard. This is a non-reversable decision and your funds will not be returned.',
        }));
    };

    return (
        <div className='tab-content submission-ipnft'>
            <form onSubmit={handleCreate}>
                <label>
                    <span>Name:</span>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <span>Description for Metadata:</span>
                    <input
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <Dropzone
                    multiple={false}
                    files={image}
                    setFiles={(file) => setImage(file)}
                    title='Insert ipNFT cover photo here:'
                    accept={{
                        'image/png': ['.png', '.jpeg', '.jpg'],
                    }}
                    description='Drag and drop in PNG/JPG Form:'
                />
                <Button type='submit' variant='tertiary'>
                    Create ipNFT
                </Button>
            </form>
        </div>
    );
};

export default SubmissionLog;
