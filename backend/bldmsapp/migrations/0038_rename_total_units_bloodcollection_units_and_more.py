# Generated by Django 4.2.16 on 2024-10-29 13:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bldmsapp', '0037_rename_hasrecived_bloodrequest_hasreceived_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bloodcollection',
            old_name='total_units',
            new_name='units',
        ),
        migrations.RemoveField(
            model_name='bloodcollection',
            name='transfered',
        ),
        migrations.RemoveField(
            model_name='bloodrequest',
            name='donor_detail',
        ),
        migrations.RemoveField(
            model_name='bloodrequest',
            name='hasReceived',
        ),
        migrations.RemoveField(
            model_name='bloodrequest',
            name='received_from',
        ),
        migrations.RemoveField(
            model_name='bloodrequest',
            name='units_received',
        ),
        migrations.CreateModel(
            name='DonationList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('units_recieved', models.IntegerField()),
                ('total_units', models.IntegerField()),
                ('donated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bldmsapp.admindetails')),
                ('requested_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bldmsapp.bloodrequest')),
            ],
        ),
    ]
