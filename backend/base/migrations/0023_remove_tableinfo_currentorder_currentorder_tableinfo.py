# Generated by Django 4.0.3 on 2022-06-09 13:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0022_alter_tableinfo_currentorder'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tableinfo',
            name='currentOrder',
        ),
        migrations.AddField(
            model_name='currentorder',
            name='tableInfo',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.tableinfo'),
        ),
    ]
