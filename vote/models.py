from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


class VoteCart(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    requirements = models.CharField(max_length=255, blank=True)
    vote_count = models.PositiveIntegerField(blank=False, null=False)

    def clean(self):
        if self.start_date > self.end_date:
            raise ValidationError('start date cant be biger than end date!')

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
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    representative = models.ForeignKey(
        Representative, on_delete=models.CASCADE)
    vote_cart = models.ForeignKey(VoteCart, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'representative']

    def clean(self):
        if self.representative.vote_cart.requirements != self.student.requirements:
            raise ValidationError('you haven\'t permission to vote!')

        if self.representative.vote_cart != self.vote_cart:
            raise ValidationError('you cant\'t vote to other voteCarts!')

        if (self.representative.vote_cart.vote_count - 1) < Vote.objects.filter(
                student=self.student,
                representative__vote_cart=self.representative.vote_cart).count():
            raise ValidationError('you can\'t vote more than vote count!')

    def __str__(self) -> str:
        return str(self.student.username) + '->' + \
            str(self.representative.student.username)
