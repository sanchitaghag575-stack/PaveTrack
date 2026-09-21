import json
import os
from bson import ObjectId

DATA_FILE = "pavetrack_data.json"


class LocalCollection:
    def __init__(self, name):
        self.name = name
        self._load()

    def _load(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r") as f:
                data = json.load(f)
        else:
            data = {}

        self.documents = data.get(self.name, [])

    def _save(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r") as f:
                data = json.load(f)
        else:
            data = {}

        data[self.name] = self.documents

        with open(DATA_FILE, "w") as f:
            json.dump(data, f, indent=4)

    def insert_one(self, document):
        document = document.copy()
        document["_id"] = str(ObjectId())

        self.documents.append(document)
        self._save()

        class Result:
            inserted_id = ObjectId(document["_id"])

        return Result()

    def find(self, query=None):
        self._load()

        if not query:
            return self.documents

        return [
            doc for doc in self.documents
            if self._matches(doc, query)
        ]

    def find_one(self, query):
        self._load()

        for doc in self.documents:
            if self._matches(doc, query):
                return doc

        return None

    def _matches(self, document, query):
        for key, value in query.items():
            if key == "_id":
                value = str(value)

            if str(document.get(key)) != str(value):
                return False

        return True


class LocalDatabase:
    def __init__(self):
        self.reports = LocalCollection("reports")
        self.repairs = LocalCollection("repairs")


db = LocalDatabase()

print("Using local PaveTrack database.")