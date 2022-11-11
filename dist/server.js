import express from 'express';
var server = express();
server.get('/health', function (req, res) {
    res.send({ message: "OK" });
});
server.listen(4000, function () {
    console.log("Listening on port 4000");
});
