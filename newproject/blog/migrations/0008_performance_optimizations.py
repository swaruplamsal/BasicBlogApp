# Generated performance optimization migration

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_userprofile'),
    ]

    operations = [
        # Add comment_count field to Post model
        migrations.AddField(
            model_name='post',
            name='comment_count',
            field=models.PositiveIntegerField(default=0),
        ),
        
        # Add database indexes for better query performance
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['-created_at'], name='blog_post_created_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['author', '-created_at'], name='blog_post_author_created_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['category', '-created_at'], name='blog_post_category_created_idx'),
        ),
        migrations.AddIndex(
            model_name='post',
            index=models.Index(fields=['published', '-created_at'], name='blog_post_published_created_idx'),
        ),
        migrations.AddIndex(
            model_name='comment',
            index=models.Index(fields=['post', '-created_at'], name='blog_comment_post_created_idx'),
        ),
        migrations.AddIndex(
            model_name='comment',
            index=models.Index(fields=['author', '-created_at'], name='blog_comment_author_created_idx'),
        ),
        
        # Add db_index=True to commonly queried fields
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(db_index=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='published',
            field=models.BooleanField(db_index=True, default=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.ForeignKey(db_index=True, on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
    ]