# Generated by Django 3.1.7 on 2021-03-04 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cbr_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='disability',
            field=models.ManyToManyField(to='cbr_api.Disability'),
        ),
        migrations.DeleteModel(
            name='DisabilityJunction',
        ),
    ]
