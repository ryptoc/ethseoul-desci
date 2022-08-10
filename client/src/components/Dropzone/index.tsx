import { useCallback, useContext } from 'react';
import { Accept, FileWithPath, useDropzone } from 'react-dropzone';
import { CrossIcon } from '../../assets/icons';
import modalContext from '../../context/modal/modalContext';

interface DropzoneProps {
    files: File[];
    setFiles: (file: File[]) => void;
    title: string;
    description?: string;
    accept?: Accept;
}

const Dropzone: React.FC<DropzoneProps> = ({
    files,
    setFiles,
    title,
    description = `Drag 'n' drop some files here, or click to select files`,
    accept,
}) => {
    const { setModalData, openModal } = useContext(modalContext);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([...files, ...acceptedFiles]);
        },
        [files, setFiles]
    );

    const onDropRejected = () => {
        setModalData((prev) => ({
            ...prev,
            status: 'Notice!',
            message: 'Incorrect file type uploaded.',
        }));
        openModal('warningModal');
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        onDropRejected,
    });

    const removeFile = (file: File) => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setFiles(newFiles);
    };

    const uploadedFiles = files.map((file: FileWithPath) => (
        <li key={file.path}>
            <span>{file.path}</span>
            <CrossIcon onClick={() => removeFile(file)} />
        </li>
    ));

    return (
        <div className='dropzone-container'>
            <span>{title}</span>
            <div className='drop-area'>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <svg
                        width='39'
                        height='38'
                        viewBox='0 0 39 38'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M21.5 5H5.5C4.43913 5 3.42172 5.42143 2.67157 6.17157C1.92143 6.92172 1.5 7.93913 1.5 9V29M1.5 29V33C1.5 34.0609 1.92143 35.0783 2.67157 35.8284C3.42172 36.5786 4.43913 37 5.5 37H29.5C30.5609 37 31.5783 36.5786 32.3284 35.8284C33.0786 35.0783 33.5 34.0609 33.5 33V25M1.5 29L10.672 19.828C11.4221 19.0781 12.4393 18.6569 13.5 18.6569C14.5607 18.6569 15.5779 19.0781 16.328 19.828L21.5 25M33.5 17V25M33.5 25L30.328 21.828C29.5779 21.0781 28.5607 20.6569 27.5 20.6569C26.4393 20.6569 25.4221 21.0781 24.672 21.828L21.5 25M21.5 25L25.5 29M29.5 5H37.5M33.5 1V9M21.5 13H21.52'
                            stroke='#9CA3AF'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <p>{description}</p>
                    <span>Upload files</span>
                </div>
                <aside>
                    <h4>Files</h4>
                    <ul>
                        {uploadedFiles.length ? uploadedFiles : 'No files uploaded...'}
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Dropzone;
