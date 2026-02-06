from django.core.management.base import BaseCommand
from django.db import transaction
from blog.models import Post, Comment


class Command(BaseCommand):
    help = 'Optimize performance by populating comment counts and running database optimizations'

    def handle(self, *args, **options):
        self.stdout.write("🚀 Starting performance optimizations...")
        self.stdout.write("=" * 50)
        
        try:
            self.populate_comment_counts()
            self.optimize_database()
            
            self.stdout.write("\n" + "=" * 50)
            self.stdout.write(
                self.style.SUCCESS("🎉 Performance optimizations completed successfully!")
            )
            self.stdout.write("\nRecommendations:")
            self.stdout.write("1. Restart your Django server to apply all changes")
            self.stdout.write("2. Clear any existing cache if you're using one")
            self.stdout.write("3. Monitor performance improvements")
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"❌ Error during optimization: {e}")
            )
            
    def populate_comment_counts(self):
        """Populate the comment_count field for existing posts"""
        self.stdout.write("Populating comment counts for existing posts...")
        
        with transaction.atomic():
            posts = Post.objects.all()
            updated_count = 0
            
            for post in posts:
                comment_count = Comment.objects.filter(post=post).count()
                if post.comment_count != comment_count:
                    post.comment_count = comment_count
                    post.save(update_fields=['comment_count'])
                    updated_count += 1
            
            self.stdout.write(
                self.style.SUCCESS(f"✅ Updated {updated_count} posts with correct comment counts")
            )

    def optimize_database(self):
        """Additional database optimizations"""
        self.stdout.write("Running additional database optimizations...")
        
        # SQLite specific optimizations
        from django.db import connection
        
        with connection.cursor() as cursor:
            try:
                # Enable Write-Ahead Logging for better concurrency
                cursor.execute("PRAGMA journal_mode=WAL;")
                
                # Increase cache size for better performance
                cursor.execute("PRAGMA cache_size=10000;")
                
                # Enable foreign key constraints
                cursor.execute("PRAGMA foreign_keys=ON;")
                
                # Optimize for speed over safety (development only)
                cursor.execute("PRAGMA synchronous=NORMAL;")
                
                self.stdout.write(
                    self.style.SUCCESS("✅ Database optimization settings applied")
                )
            except Exception as e:
                self.stdout.write(
                    self.style.WARNING(f"⚠️  Database optimization skipped: {e}")
                )