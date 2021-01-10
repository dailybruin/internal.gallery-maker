# Generated by Django 3.0.3 on 2021-01-10 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='view_choices',
            field=models.CharField(choices=[('alt', 'alternating'), ('notalt', 'not-alternating')], default='alt', max_length=50),
        ),
    ]
