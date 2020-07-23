import React, { useState, FormEvent } from 'react';
import { environment } from '../environments/environment.json';
import axios from 'axios'

interface FileProps {
    setPicturePath: (val: string) => void
}

export const FileUpload = (props: FileProps) => {
    const [file,setFile] = useState()
    const [filename, setFilename] = useState("Изберете снимка")
    const [uploadedFile, setUploadedFile] = useState({filename:"",filePath:""});

    const onChange = (e:any) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('file', file!);
        }

        try {
            const res = await axios.post(`${environment.apiUrl}/api/upload`, formData, {
                headers: {
                   "Content-Type": 'multipart/form-data'
               }
            })
            const { filename, filePath } = res.data;
            setUploadedFile({ filename, filePath })
            props.setPicturePath(filePath);
        }
        catch (err) {
            if (err.response.status === 500) {
                console.log(("Грешка в сървъра"));
            }
            else {
                console.log('Грешка с файла')
            }
        }
    }

    return (
        <div>
            {uploadedFile ? (<div>
                <h3>{uploadedFile.filename}</h3>
                <img alt="Няма качена снимка" height="200" width="200" src={uploadedFile.filePath}></img>
            </div>) : null
            }
            <form onSubmit={onSubmit}>
                <br />
                <label>{filename}</label>
                <div>
                    <input style={{ marginTop: 10, color: "transparent", display:"inline-block" }} type="file" id="customFile"
                    onChange={onChange}
                    />
                </div>
                <input style={{ marginTop: 10, padding: 5, }} type="submit" value="Качи" />
            </form>
           
        </div>
    )
}