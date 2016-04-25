# Shell demo

```python
from api.models import Track, Album
from api.serializers import AlbumSerializer, TrackSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.utils.six import BytesIO

album = Album(album_name='F*** Val*****', artist='Moi', year='2016', genre='alt_rock')
album.save()

a_s = AlbumSerializer(album)
a_s.data
#{'year': 2016, 'artist': 'Moi', 'track_set': [], 'album_name': 'F*** Val*****', 'genre': 'alt_rock'}

content = JSONRenderer().render(a_s.data)
content
#b'{"album_name":"F*** Val*****","artist":"Moi","year":2016,"genre":"alt_rock","track_set":[]}'

stream = BytesIO(content)
data = JSONParser().parse(stream)
a_s = AlbumSerializer(data=data)
a_s.is_valid()
a_s.validated_data
#OrderedDict([('album_name', 'F*** Val*****'), ('artist', 'Moi'), ('year', 2016), ('genre', 'alt_rock')])

```
