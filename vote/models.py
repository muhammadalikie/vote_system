from collections.abc import Iterable
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class VoteCart(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Representative(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    vote_cart = models.ForeignKey(VoteCart, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.student.username)

    class Meta:
        unique_together = ['student', 'vote_cart']


class Vote(models.Model):
    vote_cart = models.ForeignKey(VoteCart, on_delete=models.CASCADE)
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    representative = models.ForeignKey(
        Representative, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'representative', 'vote_cart']

    def clean(self):
        if self.vote_cart.id != self.student.vote_code:
            raise ValidationError('Cant vote to others vote code!')
        if self.vote_cart != self.representative.vote_cart:
            raise ValidationError('Cant vote to others votecart')

    def __str__(self) -> str:
        return str(self.student.username) + '->' + \
            str(self.representative.student.username)
