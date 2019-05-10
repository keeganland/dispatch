# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-08-27 17:52


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0018_podcasts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podcast',
            name='category',
            field=models.CharField(choices=[(b'Arts', b'Arts'), (b'Business', b'Business'), (b'Comedy', b'Comedy'), (b'Education', b'Education'), (b'Games &amp; Hobbies', b'Games & Hobbies'), (b'Government &amp; Organizations', b'Government & Organizations'), (b'Health', b'Health'), (b'Kids &amp; Family', b'Kids & Family'), (b'Music', b'Music'), (b'News &amp; Politics', b'News & Politics'), (b'Religion &amp; Spirituality', b'Religion & Spirituality'), (b'Science &amp; Medicine', b'Science & Medicine'), (b'Society &amp; Culture', b'Society & Culture'), (b'Sports &amp; Recreation', b'Sports & Recreation'), (b'Technology', b'Technology'), (b'TV &amp; Film', b'TV & Film')], max_length=255),
        ),
        migrations.AlterField(
            model_name='podcastepisode',
            name='type',
            field=models.CharField(max_length=255),
        ),
    ]
