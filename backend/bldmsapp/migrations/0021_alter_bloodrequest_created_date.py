# Generated by Django 4.2.16 on 2024-10-28 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0020_rename_created_bloodcollection_collected_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodrequest',
            name='created_date',
            field=models.DateTimeField(),
        ),
    ]