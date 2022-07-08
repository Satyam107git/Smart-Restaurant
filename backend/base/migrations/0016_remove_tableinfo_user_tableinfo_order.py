# Generated by Django 4.0.3 on 2022-06-07 09:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_remove_tableinfo_order_tableinfo_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tableinfo',
            name='user',
        ),
        migrations.AddField(
            model_name='tableinfo',
            name='order',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.order'),
        ),
    ]
