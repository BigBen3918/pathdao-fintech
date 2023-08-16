import express from "express";
import cors from "cors";
import path from "path";

// External Modules
import RestApi from "./apis";
import { connectDatabase } from "./models";
import config from "./config.json";
import setlog from "./utils/setlog";

// Get router
const router: express.Router = express.Router();
const app: express.Express = express();

app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend Load
if (config.production) {
    app.use(express.static(__dirname + "/../build"));
    app.get(
        "*",
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            console.log(req.url);
            const uri = path.normalize(__dirname + "/../build/index.html");
            console.log("uri", uri);
            res.sendFile(uri, function (err: any) {
                console.log("err", err);
                if (err) {
                    res.status(500).send(err);
                }
            });
        }
    );
}

// API Router
RestApi(router);
app.use("/api", router);

// Connect Database and Run Server
connectDatabase(config.database).then(() => {
    app.listen(config.port, () => {
        setlog(`Server listening on http://localhost:${config.port}`);
    });
});
