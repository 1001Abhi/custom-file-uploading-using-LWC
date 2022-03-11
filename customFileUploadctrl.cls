public class customFileUploadctrl {
@AuraEnabled
public static void saveFile(String fileName, String blobData){
    ContentVersion cntVersion = new ContentVersion();
        cntVersion.PathOnClient = fileName;
        cntVersion.Title = fileName;
        cntVersion.VersionData = EncodingUtil.base64Decode(blobData);
    insert cntVersion;
   }
}
