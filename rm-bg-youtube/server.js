
const axios = require("axios");
const formData = require("form-data");
const uuid = require("uuid").v4;
const fs = require("fs");
const path = require("path");

const IMG = 'Screenshot_14.png';

const fd = new formData();

fd.append("size", "auto");
fd.append("image_file", fs.createReadStream(IMG));
// fd.append("image_url", IMG);

axios({
    method : "POST",
    url : "https://api.remove.bg/v1.0/removebg",
    data : fd,
    responseType : "arraybuffer",
    headers : {
        ...fd.getHeaders(),
        "X-Api-Key" : "UiUB1dRc4Qc2KQTUAGrDBzur"
    },
    encoding : null
}).then(response => {
    if(response.status != 200) return console.log(response);
    fs.writeFileSync(`${uuid()}.png`, response.data);
}).catch(err => {
    console.log(err);
})