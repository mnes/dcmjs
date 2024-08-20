import { WriteBufferStream } from "./BufferStream";
import { ValueRepresentation } from "./ValueRepresentation";

const EXPLICIT_LITTLE_ENDIAN = "1.2.840.10008.1.2.1";

let DicomMessage;

class DicomDict {
    constructor(meta) {
        this.meta = meta;
        this.dict = {};
    }

    upsertTag(tag, vr, values) {
        if (this.dict[tag]) {
            // Should already have tag accessors.
            this.dict[tag].Value = values;
        } else {
            this.dict[tag] = ValueRepresentation.addTagAccessors({ vr: vr });
            this.dict[tag].Value = values;
        }
    }

    write(writeOptions = { allowInvalidVRLength: true }) {
        var metaSyntax = EXPLICIT_LITTLE_ENDIAN;
        var fileStream = new WriteBufferStream(4096, true);
        fileStream.writeUint8Repeat(0, 128);
        fileStream.writeAsciiString("DICM");

        console.log("fileStream1", fileStream.getBuffer(), fileStream);

        var metaStream = new WriteBufferStream(1024);
        if (!this.meta["00020010"]) {
            this.meta["00020010"] = {
                vr: "UI",
                Value: [EXPLICIT_LITTLE_ENDIAN]
            };
        }
        console.log("DicomMessage1", DicomMessage);
        DicomMessage.write(this.meta, metaStream, metaSyntax, writeOptions);
        console.log("DicomMessage2", DicomMessage);
        DicomMessage.writeTagObject(
            fileStream,
            "00020000",
            "UL",
            metaStream.size,
            metaSyntax,
            writeOptions
        );
        console.log("DicomMessage3", DicomMessage);
        fileStream.concat(metaStream);
        console.log("fileStream2", fileStream.getBuffer(), fileStream);

        var useSyntax = this.meta["00020010"].Value[0];
        DicomMessage.write(this.dict, fileStream, useSyntax, writeOptions);
        console.log("DicomMessage4", DicomMessage);
        const fileStreamBuffer = fileStream.getBuffer();
        console.log("fileStream3", fileStreamBuffer, fileStream);
        return fileStreamBuffer;
    }

    /** Helper method to avoid circular dependencies */
    static setDicomMessageClass(dicomMessageClass) {
        DicomMessage = dicomMessageClass;
    }
}

export { DicomDict };
