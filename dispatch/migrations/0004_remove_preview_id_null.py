# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-11-07 04:56


from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0003_add_preview_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='preview_id',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AlterField(
            model_name='page',
            name='preview_id',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]
