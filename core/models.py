from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    requirements = models.CharField(max_length=255, blank=True)

    def __str__(self) -> str:
        return self.username
