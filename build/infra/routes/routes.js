"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AppController_1 = __importDefault(require("../controllers/AppController"));
const NoteController_1 = __importDefault(require("../controllers/NoteController"));
const routes = express_1.default.Router();
const appController = new AppController_1.default();
const noteController = new NoteController_1.default();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/', appController.root);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/v1/notes', noteController.listNotes);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/v1/notes/:id', noteController.showNote);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.post('/v1/notes', noteController.createNote);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.put('/v1/notes/:id', noteController.updateNote);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.delete('/v1/notes/:id', noteController.deleteNote);
exports.default = routes;
