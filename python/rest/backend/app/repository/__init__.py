class Repository(object):
    def __init__(self, adapter=None):
        self.client = adapter

    def find(self, selector):
        return self.client.find(selector)

    def find_one(self, selector):
        return self.client.find_one(selector)

    def create(self, katsu):
        return self.client.create(katsu)

    def update(self, selector, katsu):
        return self.client.update(selector, katsu)

    def delete(self, selector):
        return self.client.delete(selector)
