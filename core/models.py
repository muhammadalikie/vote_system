from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    field = models.CharField(max_length=255, blank=True)
    vote_code = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return self.username
