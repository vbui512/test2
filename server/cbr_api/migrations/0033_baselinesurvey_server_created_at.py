# Generated by Django 3.2.9 on 2021-11-14 06:18

import cbr_api.util
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cbr_api", "0032_auto_20211113_2155"),
    ]

    operations = [
        migrations.AddField(
            model_name="baselinesurvey",
            name="server_created_at",
            field=models.BigIntegerField(default=cbr_api.util.current_milli_time),
        ),
    ]