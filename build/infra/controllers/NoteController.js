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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const ListNotesUsecase_1 = __importDefault(require("../../core/usecase/ListNotesUsecase"));
const GetNoteUsecase_1 = __importDefault(require("../../core/usecase/GetNoteUsecase"));
const CreateNoteUsecase_1 = __importDefault(require("../../core/usecase/CreateNoteUsecase"));
const UpdateNoteUsecase_1 = __importDefault(require("../../core/usecase/UpdateNoteUsecase"));
const DeleteNoteUsecase_1 = __importDefault(require("../../core/usecase/DeleteNoteUsecase"));
class NoteController {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    listNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listNotesUsecase = tsyringe_1.container.resolve(ListNotesUsecase_1.default);
            const notes = yield listNotesUsecase.execute();
            res.json(notes);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    showNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const getNoteUsecase = tsyringe_1.container.resolve(GetNoteUsecase_1.default);
            const id = req.params.id;
            const note = yield getNoteUsecase.execute(id);
            res.json(note);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createNoteUsecase = tsyringe_1.container.resolve(CreateNoteUsecase_1.default);
            const { title, description } = req.body;
            const note = yield createNoteUsecase.execute(title, description);
            res.status(201);
            res.json(note);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateNoteUsecase = tsyringe_1.container.resolve(UpdateNoteUsecase_1.default);
            const id = req.params.id;
            const { title, description, archive } = req.body;
            const note = yield updateNoteUsecase.execute(id, title, description, archive);
            res.json(note);
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteNoteUsecase = tsyringe_1.container.resolve(DeleteNoteUsecase_1.default);
            const id = req.params.id;
            yield deleteNoteUsecase.execute(id);
            res.json({ message: 'marked for deleation' });
        });
    }
    static instantiate() {
        return new NoteController();
    }
}
exports.default = NoteController;
