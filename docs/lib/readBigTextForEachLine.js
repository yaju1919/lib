// https://qiita.com/jiyu/items/3e29959758de497850b9
function readBigTextForEachLine(file, callback, chunk_size){
    "use strict";
    chunk_size = chunk_size || 1024;
    var offset = 0,
        text = "",
        slice = "";
    var fr = new FileReader();
    fr.onload = function(){
        if(typeof fr.result === "string") {
            callback(text + fr.result.replace(/\r/g, "\n"));
            return true;
        }
        var view = new Uint8Array(fr.result);
        for(var i = 0, l=view.length; i<l; i++) {
            if(view[i] === 13) { // \n = 10 and \r = 13
                if(view[i+1] === 10) i++;
                callback(text + "\n");
                text = "";
                continue;
            }
            text += String.fromCharCode(view[i]);
        }
        seek();
    };
    fr.onerror = function(){
        return callback("Failed to read file.");
    };
    function seek(){
        if (offset + chunk_size >= file.size) {
            slice = file.slice(offset);
            fr.readAsText(slice);
        } else {
            slice = file.slice(offset, offset + chunk_size);
            fr.readAsArrayBuffer(slice);
        }
        offset += chunk_size;
    };
    seek();
};
