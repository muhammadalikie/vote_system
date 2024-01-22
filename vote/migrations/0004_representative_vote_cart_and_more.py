# Generated by Django 5.0.1 on 2024-01-22 10:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0003_votecart_alter_vote_unique_together_vote_vote_cart_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='representative',
            name='vote_cart',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='vote.votecart'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='representative',
            unique_together={('student', 'vote_cart')},
        ),
    ]