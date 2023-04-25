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
const Note_1 = __importDefault(require("../../core/entity/Note"));
const uuid_1 = require("uuid");
class NoteRepositoryInMemory {
    constructor() {
        this.notes = [
            new Note_1.default((0, uuid_1.v4)(), 'Note 1', 'Foo'),
            new Note_1.default((0, uuid_1.v4)(), 'Note 2', 'Bar'),
            new Note_1.default((0, uuid_1.v4)(), 'Note 3', 'Baz')
        ];
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve(this.notes);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve(this.notes.find(n => n.id === id));
        });
    }
    create(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const note = new Note_1.default(id, title, description);
            this.notes.push(note);
            return yield this.find(id);
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield this.find(id);
            if (note === undefined) {
                return;
            }
            if (changes.title !== undefined) {
                note.title = changes.title;
            }
            if (changes.description !== undefined) {
                note.description = changes.description;
            }
            if (changes.archive !== undefined) {
                note.archive = changes.archive;
            }
            for (let i = 0; i < this.notes.length; i++) {
                if (this.notes[i].id === id) {
                    this.notes[i] = note;
                }
            }
            return note;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.notes = this.notes.filter(n => n.id !== id);
        });
    }
}
exports.default = NoteRepositoryInMemory;
