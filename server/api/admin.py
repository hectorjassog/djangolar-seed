from django.contrib import admin

from .models import Track, Album

class TrackInline(admin.StackedInline):
    model = Track
    extra = 1
    fields = (('order', 'title', 'duration'),)


class AlbumAdmin(admin.ModelAdmin):

    fields = (('album_name', 'year', 'artist', 'genre'),)
    list_display = ('album_name', 'year', 'artist', 'genre', 'number_of_tracks')
    list_filter = ['year','genre']
    search_fields = ['album_name']
    inlines = [TrackInline]

    def number_of_tracks(self,obj):
        return obj.tracks.all().count()

admin.site.register(Album, AlbumAdmin)
