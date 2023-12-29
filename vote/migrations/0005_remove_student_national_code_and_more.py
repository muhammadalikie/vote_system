# Generated by Django 5.0 on 2023-12-29 10:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0004_alter_vote_unique_together'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='national_code',
        ),
        migrations.RemoveField(
            model_name='student',
            name='stu_number',
        ),
        migrations.AddField(
            model_name='student',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
