from django.db import models


# Create your models here.
class TodoModel(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(default='Default Content')

    def __str__(self):
        return self.title
