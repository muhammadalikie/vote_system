from django.contrib import admin
from .models import Representative, Vote

@admin.register(Representative)
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'stu_number']

    def stu_number(self, representative):
        return representative.student.username


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'representative']
