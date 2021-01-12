from django.db import models
from django.db.models import Model

# Create your models here.


class Gallery(models.Model):


	# gallery should have id (primary key)
	#  	 and a gallery_name (textfield)

	description = models.TextField(max_length=50)

	credits = models.TextField(max_length=50, null=True)

	ALT= 'alt'
	NOTALT = 'notalt'

	POSSIBLE_VIEW_CHOICES = [

    (ALT, 'alternating'),
    (NOTALT, 'not-alternating')

	]

	view_choices = models.CharField(
		max_length=10,
		choices=POSSIBLE_VIEW_CHOICES,
		default = ALT
	)




class Image(models.Model):

	img_url = models.URLField(max_length=200)
	description = models.TextField(max_length=300, default="")

	# foregin key
	gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE )

