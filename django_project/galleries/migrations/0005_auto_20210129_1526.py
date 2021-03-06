# Generated by Django 3.0.3 on 2021-01-29 23:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0004_auto_20210111_2132'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'ordering': ['index']},
        ),
        migrations.RenameField(
            model_name='gallery',
            old_name='view_choices',
            new_name='layout',
        ),
        migrations.RemoveField(
            model_name='gallery',
            name='credits',
        ),
        migrations.RemoveField(
            model_name='gallery',
            name='description',
        ),
        migrations.AddField(
            model_name='image',
            name='credits',
            field=models.TextField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='image',
            name='index',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='image',
            name='gallery',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='galleries.Gallery'),
        ),
    ]
