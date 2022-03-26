const path = require('path');
const formData = require('form-data');
const fs = require('fs');
const axios = require('axios');

exports.upload = async (req, res, next) => {
    try {
        if (!req.file) {
            console.log("No file received");
            return res.status(500).json({
                success:false,
                data: 'Image Missing'
            })
        };

        let assetsPath = path.join(__dirname + '/../assets');
        let assetName = req.body.imageName;

        let data = new formData();
        data.append('files', fs.createReadStream(assetsPath + "/" + assetName));
        data.append('name', assetName);
        data.append('cidVersion', '1');
        data.append('wrapWithDirectory', 'false');
        data.append('pinToIPFS', 'false');

        var config = {
            method: 'post',
            url: 'https://managed.mypinata.cloud/api/v1/content',
            headers: {
                'x-api-key': '7pOx7VnDHTWqQIOv70vd5xAAlJqWqWXr',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJraWQiOiJWdmNrdWg5Zktvd0gzR2N6U2d5eVRpbmZiRm9WcXhRVE9zZWpmRFpiM2tZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiMzUwNGI0NS0yMGJjLTQyNDctOTRmYS0yZDhiNWRkNjc5MjMiLCJkZXZpY2Vfa2V5IjoidXMtZWFzdC0xX2QxMjc4MjJiLTZhNzUtNDU0MC05ZTdjLWVkMTdiZTRjMTViNSIsImV2ZW50X2lkIjoiZDVkYzFiZGQtNjZlZC00NDBkLTllZjktOTA2OTYzNjFiNDdjIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY0Njg5NjQ2MCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfc3ZlTTA3TFN0IiwiZXhwIjoxNjQ3MTU3MzY0LCJpYXQiOjE2NDcwNzA5NjQsImp0aSI6ImM0OWMwY2E4LWNiMGEtNDQ0Zi05OGZlLWNkYmI4MmE5NGQ4MyIsImNsaWVudF9pZCI6IjdlY28wNmRjNWtlOTR0Y2o0dmFsOTJraGE5IiwidXNlcm5hbWUiOiJiMzUwNGI0NS0yMGJjLTQyNDctOTRmYS0yZDhiNWRkNjc5MjMifQ.dGOQ8gbFPhQXLW5jaVO9eoV1WeqhRoRNkLFmg88vWu7xlXa2dgs3bQS115MXmRpZ5YsFjidWNBOy-FgRrO9exYK7Wn6NdBhfPhWGcecHVxQTzxcH9V63ecac4Bhn6zJ0g1qXiSJzTRXOb-3TfCAiW9H6qGX4tK7-ibXqWYZBGDAg6eCKT6Em0xxH-1vuKIgb67S0UbYyuwkN1rACIq2O31LHwKaS9YBgLNCeJrzR8jXXzJitcplJ5phRabQ40bFbqNTsdXFUksqY0nd_Ko-qxPnjXQBwgjIjVvSyzPomM1uKrlqrVS_IHK_7wkH3PEzhK-waL1mGGdYql3I9ULV9qg',
                ...data.getHeaders()
            },
            data: data
        };

        let result;

        result = await axios(config).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return error;
        });
        console.log(result.data)

        return res.status(200).json({
            success: true,
            imageData: result.items[0]
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            data: error
        })
    }
}