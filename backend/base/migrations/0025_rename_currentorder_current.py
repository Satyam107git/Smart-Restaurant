# Generated by Django 4.0.3 on 2022-06-09 14:13

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0024_remove_currentorder_tableinfo_tableinfo_currentorder'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CurrentOrder',
            new_name='Current',
        ),
    ]