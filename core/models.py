from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    field = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.username
