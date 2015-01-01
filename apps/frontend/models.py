from django.db.models import Model, CharField

class FileResource(Model):
    name = CharField(max_length=255, blank=True, null=True)
    filename = CharField(max_length=255)
    type = CharField(max_length=50)