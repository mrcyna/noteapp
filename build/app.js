"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./infra/routes/routes"));
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const NoteRepositoryInMemory_1 = __importDefault(require("./infra/repository/NoteRepositoryInMemory"));
const NoteRepositoryMongoDB_1 = __importDefault(require("./infra/repository/NoteRepositoryMongoDB"));
const ListNotesUsecase_1 = __importDefault(require("./core/usecase/ListNotesUsecase"));
const GetNoteUsecase_1 = __importDefault(require("./core/usecase/GetNoteUsecase"));
const CreateNoteUsecase_1 = __importDefault(require("./core/usecase/CreateNoteUsecase"));
const UpdateNoteUsecase_1 = __importDefault(require("./core/usecase/UpdateNoteUsecase"));
const DeleteNoteUsecase_1 = __importDefault(require("./core/usecase/DeleteNoteUsecase"));
dotenv.config();
const app = (0, express_1.default)();
const port = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.APP_PORT) !== null && _b !== void 0 ? _b : 3000;
const storage = (_d = (_c = process.env) === null || _c === void 0 ? void 0 : _c.APP_STORAGE) !== null && _d !== void 0 ? _d : 'memory';
const noteRepository = storage === 'memory'
    ? new NoteRepositoryInMemory_1.default()
    : new NoteRepositoryMongoDB_1.default((_e = process.env) === null || _e === void 0 ? void 0 : _e.MONGODB_URL, (_f = process.env) === null || _f === void 0 ? void 0 : _f.MONGODB_DB);
tsyringe_1.container.register(ListNotesUsecase_1.default, { useValue: new ListNotesUsecase_1.default(noteRepository) });
tsyringe_1.container.register(GetNoteUsecase_1.default, { useValue: new GetNoteUsecase_1.default(noteRepository) });
tsyringe_1.container.register(CreateNoteUsecase_1.default, { useValue: new CreateNoteUsecase_1.default(noteRepository) });
tsyringe_1.container.register(UpdateNoteUsecase_1.default, { useValue: new UpdateNoteUsecase_1.default(noteRepository) });
tsyringe_1.container.register(DeleteNoteUsecase_1.default, { useValue: new DeleteNoteUsecase_1.default(noteRepository) });
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
