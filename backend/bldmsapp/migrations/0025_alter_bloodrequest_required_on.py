# Generated by Django 4.2.16 on 2024-10-28 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0024_alter_bloodrequest_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodrequest',
            name='required_on',
            field=models.DateField(),
        ),
    ]
