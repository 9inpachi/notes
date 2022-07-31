import os
from pymongo import MongoClient

COLLECTION_NAME = "katsus"

class MongoRepository(object):
  def __init__(self):
    mongo_url = os.environ.get("MONGO_URL")
    self.db = MongoClient(mongo_url).python_katsus

  def find(self, selector):
    return self.db.katsus.find(selector)
    
  def find_one(self, selector):
    return self.db.katsus.find_one(selector)
    
  def create(self, katsu):
    return self.db.katsus.insert_one(katsu)

  def update(self, selector, katsu):
    return self.db.katsus.replace_one(selector, katsu).modified_count

  def delete(self, selector):
    return self.db.katsus.delete_one(selector).deleted_count
