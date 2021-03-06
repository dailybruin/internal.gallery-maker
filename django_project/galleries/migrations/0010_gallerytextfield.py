# Generated by Django 3.0.3 on 2021-05-01 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('galleries', '0009_auto_20210420_0633'),
    ]

    operations = [
        migrations.CreateModel(
            name='GalleryTextField',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('index', models.IntegerField()),
                ('gallery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='textfields', to='galleries.Gallery')),
            ],
            options={
                'ordering': ['index'],
            },
        ),
    ]
