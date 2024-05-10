"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield (0, app_1.initServer)();
        const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
        app.listen(PORT, () => {
            console.log("start");
        });
    });
}
init();
// import { initServer } from "./app";
// async function init() {
//     const app = await initServer();
//     const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 10000; // Use port 10000 by default if environment variable PORT is not set
//     app.listen(PORT, '0.0.0.0', () => {
//         console.log(`Server running at http://0.0.0.0:${PORT}`);
//     });
// }
// init();
