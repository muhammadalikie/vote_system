from django.contrib import admin
from .models import Student, Representative, Vote


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'stu_number', 'national_code', 'field']


@admin.register(Representative)
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'stu_number']

    def stu_number(self, representative):
        return representative.student.stu_number


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'representative']
