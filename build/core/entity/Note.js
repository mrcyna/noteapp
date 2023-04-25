"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Note {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.archive = false;
    }
}
exports.default = Note;
