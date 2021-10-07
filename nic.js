// function vsas(){
        //     let _cdp = "test.docx"
        //     const dirunpack = "docxs"
        //     let nc = ""
        //     decompress(_cdp, `${dirunpack}/${_cdp}`).then((dde)=>{
        //         dde.forEach(fr =>{
        //             if(fr.path === "word/document.xml") {
        //                 fs.readFile(`${dirunpack}/${_cdp}/${fr.path}`, "utf-8", (err, data)=>{
        //                     let f = data.replace('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>', ' ').replace(
        //                         '<w:document xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" mc:Ignorable="w14 wp14">', '')
        //                         .replace('<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 wp14">', '')
        //                         .replace('</w:document>', '').replace('<w:background w:color="FFFFFF"/>', '').replace('<w:body>', '')
        //                         .replace('</w:body>', '').replace('<w:sectPr><w:pgSz w:w="11906" w:h="16838" w:orient="portrait"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708" w:gutter="0" w:mirrorMargins="false"/><w:cols w:space="708" w:num="1" w:sep="false"/><w:docGrid w:linePitch="360"/><w:pgNumType/></w:sectPr>', '')
        //                     console.log(f)
        //                     nc = f
                            
        //                 })
        //             }
        //         });
                
        //     }).catch((error) => console.log(error) )
    
        //     console.log(nc);
        // }
        // vsas();