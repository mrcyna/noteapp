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
const mongodb_1 = require("mongodb");
var collection;
(function (collection) {
    collection["notes"] = "notes";
})(collection || (collection = {}));
class NoteRepositoryMongoDB {
    constructor(url, database) {
        this.notes = [];
        this.client = new mongodb_1.MongoClient(url);
        this.database = database;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const db = this.client.db(this.database);
            const result = yield db.collection(collection.notes).find({}).toArray();
            const notes = [];
            for (const item of result) {
                notes.push({
                    id: item === null || item === void 0 ? void 0 : item._id.toString(),
                    title: item === null || item === void 0 ? void 0 : item.title,
                    description: item === null || item === void 0 ? void 0 : item.description,
                    archive: item === null || item === void 0 ? void 0 : item.archive
                });
            }
            return notes;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const db = this.client.db(this.database);
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield db.collection(collection.notes).findOne(query);
            return {
                id: result === null || result === void 0 ? void 0 : result._id.toString(),
                title: result === null || result === void 0 ? void 0 : result.title,
                description: result === null || result === void 0 ? void 0 : result.description,
                archive: result === null || result === void 0 ? void 0 : result.archive
            };
        });
    }
    create(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const db = this.client.db(this.database);
            const insertResult = yield db.collection(collection.notes).insertOne({
                title,
                description,
                archive: false
            });
            return yield this.find(insertResult.insertedId.toString());
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
            yield this.client.connect();
            const db = this.client.db(this.database);
            const query = { _id: new mongodb_1.ObjectId(id) };
            yield db.collection(collection.notes).updateOne(query, { $set: note });
            return yield this.find(id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            const db = this.client.db(this.database);
            const query = { _id: new mongodb_1.ObjectId(id) };
            yield db.collection(collection.notes).deleteOne(query);
        });
    }
}
exports.default = NoteRepositoryMongoDB;
