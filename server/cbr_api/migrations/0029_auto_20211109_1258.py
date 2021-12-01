# Generated by Django 3.2.9 on 2021-11-09 20:58

import cbr_api.util
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0028_auto_20211108_1458"),
    ]

    operations = [
        migrations.AddField(
            model_name="improvement",
            name="created_at",
            field=models.BigIntegerField(default=cbr_api.util.current_milli_time),
        ),
        migrations.AddField(
            model_name="outcome",
            name="created_at",
            field=models.BigIntegerField(default=cbr_api.util.current_milli_time),
        ),
    ]