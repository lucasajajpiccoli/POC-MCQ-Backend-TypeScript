import express from 'express';
import { Request, Response } from 'express';

const server = express();

server.get('/health', (req: Request, res: Response) => {
    res.send({message: "All right"});
});

server.listen(4000, () => {
    console.log("Listening on port 4000")
});