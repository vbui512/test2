# Generated by Django 3.2.5 on 2021-07-27 02:56

import cbr_api.models
import cbr_api.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cbr_api', '0015_auto_20210409_0127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='picture',
            field=models.ImageField(blank=True, storage=cbr_api.storage.OverwriteStorage(), upload_to=cbr_api.models.Client.rename_file),
        ),
    ]
