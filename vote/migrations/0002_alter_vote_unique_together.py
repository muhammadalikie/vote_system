# Generated by Django 5.0.1 on 2024-01-21 20:15

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together={('student', 'representative', 'name')},
        ),
    ]
