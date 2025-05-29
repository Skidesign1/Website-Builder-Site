import React from 'react';
import * as filestack from 'filestack-js';

const API_KEY = 'AOHmOfdMQjuQKBZngxLrAz'
const client = filestack.init(API_KEY);

const FilestackUploader = () => {
    const handleUpload = () => {
        client.picker({
            onUploadDone: (res) => {
                console.log('Upload complete:', res);
                // You can add more logic here to handle the uploaded file(s)
            },
        }).open();
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <button className='bg-[lavender] p-5 cursor-pointer rounded font-bold' onClick={handleUpload}>Upload File with Filestack</button>
        </div>
    );
};

export default FilestackUploader;