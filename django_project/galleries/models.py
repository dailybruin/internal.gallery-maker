from django.db import models
from django.db.models import Model

# Create your models here.


class Gallery(models.Model):


    # gallery should have id (primary key)
    #       and a gallery_name (textfield)

    ALT= 'alt'
    NOTALT = 'notalt'

    POSSIBLE_VIEW_CHOICES = [
        (ALT, 'alternating'),
        (NOTALT, 'not-alternating')
    ]

    layout = models.CharField(
        max_length=10,
        choices=POSSIBLE_VIEW_CHOICES,
        default = ALT
    )
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=100, blank=True)


class Image(models.Model):
    # image url
    img_url = models.URLField(max_length=200)
    # desc of img
    description = models.TextField(max_length=300, default="")
    # photo creds
    credits = models.TextField(max_length=50, null=True)

    # specify order of imgs
    index = models.IntegerField()

    # foreign key
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE, related_name="images")

    # type of image (center, alternating)
    CENTER_PHOTO= 'center-photo'
    ALT_PHOTO = 'alt-photo'

    POSSIBLE_TYPE_CHOICES = [
        (CENTER_PHOTO, CENTER_PHOTO),
        (ALT_PHOTO, ALT_PHOTO)
    ]
    type = models.CharField(
        max_length=12,
        choices=POSSIBLE_TYPE_CHOICES,
        default = ALT_PHOTO
    )

    class Meta:
        ordering = ['index']


