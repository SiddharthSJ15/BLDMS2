# Generated by Django 4.2.16 on 2024-10-29 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0036_remove_bloodcollection_transfer_units'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bloodrequest',
            old_name='hasRecived',
            new_name='hasReceived',
        ),
        migrations.AddField(
            model_name='bloodcollection',
            name='transfered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='bloodrequest',
            name='units_received',
            field=models.IntegerField(default=0),
        ),
    ]