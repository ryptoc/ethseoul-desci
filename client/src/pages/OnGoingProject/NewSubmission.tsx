import { useState } from 'react';
import Button from '../../components/Button';
import Dropzone from '../../components/Dropzone';

const NewSubmission = () => {
    const [pdf, setPdf] = useState<File[]>([]);

    return (
        <div className='tab-content new-submission'>
            <span>
                Note: By submitting, you will replace the previous submission with this
                one.
            </span>

            <Dropzone
                title='Insert files here:'
                files={pdf}
                setFiles={(file) => setPdf(file)}
                accept={{
                    'application/pdf': ['.pdf'],
                }}
                multiple={false}
            />
            <Button variant='tertiary'>Submit Files</Button>
        </div>
    );
};

export default NewSubmission;
