# Generated by Django 4.2.16 on 2024-10-24 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='logindata',
            name='last_login',
            field=models.DateTimeField(blank=True, null=True, verbose_name='last login'),
        ),
    ]
