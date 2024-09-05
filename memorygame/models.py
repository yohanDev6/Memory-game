from django.db import models

class Partida(models.Model):
    name = models.CharField(null=False, max_length=64)
    attempts = models.IntegerField(null=False)
    datetime = models.DateTimeField(null=False)
    time = models.TimeField(null=False)