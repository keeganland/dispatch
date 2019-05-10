# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-01-17 08:46


from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dispatch', '0010_image_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='VideoAttachment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.TextField(blank=True, null=True)),
                ('credit', models.TextField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(null=True)),
                ('article', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='video_article', to='dispatch.Article')),
                ('page', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='video_page', to='dispatch.Page')),
                ('video', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='video', to='dispatch.Video')),
            ],
        ),
        migrations.AlterField(
            model_name='imageattachment',
            name='article',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='image_article', to='dispatch.Article'),
        ),
        migrations.AlterField(
            model_name='imageattachment',
            name='page',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='image_page', to='dispatch.Page'),
        ),
        migrations.AddField(
            model_name='article',
            name='featured_video',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='article_featured_video', to='dispatch.VideoAttachment'),
        ),
        migrations.AddField(
            model_name='page',
            name='featured_video',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page_featured_video', to='dispatch.VideoAttachment'),
        ),
    ]
