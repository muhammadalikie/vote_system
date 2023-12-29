from django.db import models
from django.contrib.auth.models import User


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    field = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.user.username)


class Representative(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.student.user.username)


class Vote(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    representative = models.ForeignKey(
        Representative, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['student', 'representative']

    def __str__(self) -> str:
        return str(self.student.user.username) + '->' + \
            str(self.representative.student.user.username)
