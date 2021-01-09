from django.db import models
from django.db.models import Model

# Create your models here.


class Gallery(models.Model):


	# gallery should have id (primary key)
	#  	 and a gallery_name (textfield)

	name = models.TextField(max_length=50)



class Image(models.Model):

	img_url = models.URLField(max_length=200)
	description = models.TextField(max_length=300, default="")

	# foregin key
	gallery_id = models.ForeignKey(Gallery, on_delete=models.CASCADE )



	# 
	#
	#
	#


