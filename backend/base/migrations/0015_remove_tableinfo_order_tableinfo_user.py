# Generated by Django 4.0.3 on 2022-06-07 09:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0014_review_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tableinfo',
            name='order',
        ),
        migrations.AddField(
            model_name='tableinfo',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]