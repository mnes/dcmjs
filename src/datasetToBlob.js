import { DicomMetaDictionary } from "./DicomMetaDictionary.js";
import { DicomDict } from "./DicomDict.js";

function datasetToDict(dataset) {
    const fileMetaInformationVersionArray = new Uint8Array(2);
    fileMetaInformationVersionArray[1] = 1;

    const TransferSyntaxUID =
        dataset._meta.TransferSyntaxUID &&
        dataset._meta.TransferSyntaxUID.Value &&
        dataset._meta.TransferSyntaxUID.Value[0]
            ? dataset._meta.TransferSyntaxUID.Value[0]
            : "1.2.840.10008.1.2.1";

    dataset._meta = {
        MediaStorageSOPClassUID: dataset.SOPClassUID,
        MediaStorageSOPInstanceUID: dataset.SOPInstanceUID,
        ImplementationVersionName: "dcmjs-0.0",
        TransferSyntaxUID,
        ImplementationClassUID:
            "2.25.80302813137786398554742050926734630921603366648225212145404",
        FileMetaInformationVersion: fileMetaInformationVersionArray.buffer
    };

    const denaturalized = DicomMetaDictionary.denaturalizeDataset(
        dataset._meta
    );
    const dicomDict = new DicomDict(denaturalized);
    dicomDict.dict = DicomMetaDictionary.denaturalizeDataset(dataset);
    return dicomDict;
}

function datasetToBuffer(dataset) {
    var dsDict = datasetToDict(dataset);
    // Remove any props from dsDict where the value is ArrayBuffer
    for (let key in dsDict) {
        if (
            dsDict[key] &&
            dsDict[key].Value &&
            dsDict[key].Value instanceof ArrayBuffer
        ) {
            console.warn(`Removing property ${key} as it is an ArrayBuffer`);
            delete dsDict[key];
        }
    }
    let buffer;
    try {
        buffer = Buffer.from(dsDict.write());
    } catch (e) {
        console.error("BAD BUFFER", e);
        buffer = null; // Return null if buffer creation fails
    }
    return buffer;
}

function datasetToBlob(dataset) {
    const buffer = datasetToBuffer(dataset);
    return new Blob([buffer], { type: "application/dicom" });
}

export { datasetToBlob, datasetToBuffer, datasetToDict };
