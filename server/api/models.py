from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

GENRE_CHOICES = (
    ('rock', 'Rock',), ('alt_rock', 'Alternative Rock'), ('psyche_rock', 'Psychedelic Rock'),
    ('inde_rock', 'Independent Rock'), ('folk_rock', 'Folk Rock'), ('hard_rock', 'Hard Rock'),
    ('jazz_rock', 'Jazz Rock'), ('opera_rock', 'Opera Rock'), ('classic_rock', 'Classic Rock'),
    ('blues_rock', 'Blues Rock'), ('elvis', 'Elvis\''), ('pop_rock', 'Pop Rock'),
    ('beatles', 'The Beatles\''),
)

class Album(models.Model):
    album_name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    year = models.IntegerField(validators=[MinValueValidator(-6000), MaxValueValidator(3000)])
    genre = models.CharField(max_length=100, choices=GENRE_CHOICES)

    class Meta:
        ordering = ('artist', 'year',)
        unique_together = ('album_name', 'artist', 'year',)

class Track(models.Model):
    title = models.CharField(max_length=100)
    duration = models.IntegerField(validators=[MinValueValidator(1)]) # in seconds
    order = models.IntegerField()
    album = models.ForeignKey(Album)

    class Meta:
        ordering = ('order',)
