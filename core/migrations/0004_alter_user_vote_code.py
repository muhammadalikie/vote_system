# Generated by Django 5.0.1 on 2024-01-22 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_user_vote_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='vote_code',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
