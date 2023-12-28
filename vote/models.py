from django.db import models


class Student(models.Model):
    stu_number = models.IntegerField(unique=True)
    national_code = models.IntegerField(unique=True)
    field = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.stu_number)


class Representative(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.student.stu_number)


class Vote(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    representative = models.ForeignKey(
        Representative, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['student', 'representative']

    def __str__(self) -> str:
        return str(self.student.stu_number) + '->' + \
            str(self.representative.student.stu_number)
