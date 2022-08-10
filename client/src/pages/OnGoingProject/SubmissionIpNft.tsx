import React, { useState } from 'react';
import Button from '../../components/Button';
import Dropzone from '../../components/Dropzone';

const initialState = {
    name: '',
    description: '',
};

const SubmissionLog = () => {
    const [formData, setFormData] = useState(initialState);
    const [image, setImage] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className='tab-content submission-ipnft'>
            <label>
                <span>Name:</span>
                <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                <span>Description for Metadata:</span>
                <input
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
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
            <Button variant='tertiary'>Create ipNFT</Button>
        </div>
    );
};

export default SubmissionLog;
