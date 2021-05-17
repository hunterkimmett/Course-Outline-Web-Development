from django.db import models


class Echo(models.Model):
    message = models.TextField(default='echo')

    def __str__(self):
        return self.message
