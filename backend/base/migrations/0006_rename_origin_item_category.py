# Generated by Django 4.0.3 on 2022-06-03 08:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_item_origin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='origin',
            new_name='category',
        ),
    ]
