# Generated by Django 4.2.16 on 2024-10-25 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0016_rename_blood_blood_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloodcollection',
            name='blood',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bldmsapp.blood'),
        ),
    ]
