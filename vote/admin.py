from django.contrib import admin
from .models import Representative, Vote, VoteCart


@admin.register(VoteCart)
class VoteCartAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']


@admin.register(Representative)
class RepresentativeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'stu_number', 'vote_cart']

    def stu_number(self, representative):
        return representative.student.username


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'vote_cart', 'student', 'representative', 'date']
