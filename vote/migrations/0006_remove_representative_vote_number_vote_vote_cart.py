# Generated by Django 5.0.1 on 2024-03-25 20:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vote', '0005_representative_vote_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='representative',
            name='vote_number',
        ),
        migrations.AddField(
            model_name='vote',
            name='vote_cart',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='vote.votecart'),
            preserve_default=False,
        ),
    ]
