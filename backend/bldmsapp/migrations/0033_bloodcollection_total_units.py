# Generated by Django 4.2.16 on 2024-10-29 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0032_bloodrequest_donor_detail_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloodcollection',
            name='total_units',
            field=models.IntegerField(null=True),
        ),
    ]
