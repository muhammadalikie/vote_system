# Generated by Django 5.0.1 on 2024-03-25 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0004_votecart_vote_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='representative',
            name='vote_number',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]
