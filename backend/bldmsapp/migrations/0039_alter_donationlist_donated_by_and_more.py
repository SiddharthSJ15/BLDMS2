# Generated by Django 4.2.16 on 2024-10-29 13:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0038_rename_total_units_bloodcollection_units_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donationlist',
            name='donated_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='bldmsapp.admindetails'),
        ),
        migrations.AlterField(
            model_name='donationlist',
            name='units_recieved',
            field=models.IntegerField(null=True),
        ),
    ]
