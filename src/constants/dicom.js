module.exports = Object.freeze({
    // TransferSyntaxUIDs
    IMPLICIT_LITTLE_ENDIAN: "1.2.840.10008.1.2",
    EXPLICIT_LITTLE_ENDIAN: "1.2.840.10008.1.2.1",
    DEFLATED_EXPLICIT_LITTLE_ENDIAN: "1.2.840.10008.1.2.1.99",
    EXPLICIT_BIG_ENDIAN: "1.2.840.10008.1.2.2",

    // Data Element Length
    UNDEFINED_LENGTH: 0xffffffff,
    ITEM_DELIMITATION_LENGTH: 0x00000000,

    // Delimitation Value
    SEQUENCE_DELIMITATION_VALUE: 0x00000000
});
