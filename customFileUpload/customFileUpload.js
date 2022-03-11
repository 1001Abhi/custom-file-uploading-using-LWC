import { LightningElement, track } from 'lwc';
import saveFile from '@salesforce/apex/customFileUploadctrl.saveFile';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomFileUpload extends LightningElement {
    @track filesName;
    @track loader = false;
    fileData;
    get acceptedFormats() {
        return ['.pdf', '.jpg', '.jpeg', '.png'];
    }
    //handle file changes
    openFileUpload(event) {
        let files = event.target.files;
        if (files) {
            let file = files[0];
            this.filesName = file.name;
            let freader = new FileReader();
            freader.onload = fr => {
                let base64 = 'base64,';
                let contentData = freader.result.indexOf(base64) + base64.length;
                let subStringFile = freader.result.substring(contentData);
                this.fileData = {
                    'fileName': file.name,
                    'blobData': subStringFile
                };
            };
            freader.readAsDataURL(file);
        }
    }
    handleUpload() {
        const { fileName, blobData } = this.fileData;
        this.loader = true;
        saveFile({
            fileName, blobData
        })
            .then(() => {
                this.fileData = null;
                this.loader = false;
                this.filesName = '';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "success!",
                        message: 'File Upload successfully',
                        variant: "success"
                    })
                );
            })
    }
}