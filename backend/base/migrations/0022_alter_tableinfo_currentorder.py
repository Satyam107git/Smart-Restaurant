# Generated by Django 4.0.3 on 2022-06-09 12:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_tableinfo_currentorder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tableinfo',
            name='currentOrder',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.currentorder'),
        ),
    ]
