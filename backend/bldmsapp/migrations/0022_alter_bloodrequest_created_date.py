# Generated by Django 4.2.16 on 2024-10-28 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0021_alter_bloodrequest_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodrequest',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
