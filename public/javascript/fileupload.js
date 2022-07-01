FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageTransform

) 

// FilePond.setOptions({
//     stylePanelAspectRatio: 175/271,
//     imageResizeTargetWidth : 271,
//     imageResizeTargetHeight : 175
// })



FilePond.parse(document.body);