# Generated by Django 4.0.3 on 2022-06-09 15:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0026_rename_current_currentorder'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tableinfo',
            old_name='availabilty_status',
            new_name='availability_status',
        ),
    ]