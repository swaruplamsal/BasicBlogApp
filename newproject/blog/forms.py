from django import forms
from .models import Post,Comment

class PostForm(forms.ModelForm):
    class Meta:
        model=Post
        fields=['title','content','published','tags', 'category']
        widget={
            'title': forms.TextInput(attrs={'placeholder':'Enter post title'}),
            'content':forms.Textarea(attrs={'rows':10, 'placeholder':'Write your post content'}),
            'tags':forms.CheckboxSelectMultiple(),
        }

    def clean_title(self):
        title=self.cleaned_data['title']
        if len(title)<5:
            raise forms.ValidationError("Title must be longer than 5 characters!")
        return title
    
class CommentForm(forms.ModelForm):
    class Meta:
        model=Comment
        fields=['content']
        widgets={
            'content':forms.Textarea(attrs={'rows':3, 'placeholder':'Write your comment'}),
        }