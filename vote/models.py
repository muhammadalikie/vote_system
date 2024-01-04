from django.db import models
from django.conf import settings


class Representative(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.student.username)


class Vote(models.Model):
    name = models.CharField(max_length=255)
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    representative = models.ForeignKey(
        Representative, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'representative']

    def __str__(self) -> str:
        return str(self.student.username) + '->' + \
            str(self.representative.student.username)
