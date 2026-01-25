from .models import Post
from .forms import PostForm, CommentForm
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth import login
from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
# Create your views here.

# FBV
# def post_detail(request, post_id):
#     post=get_object_or_404(Post, id=post_id)
#     return render(request, 'blog/post_details.html', {'post': post})

#CBV
class PostDetailView(DetailView):
    model=Post
    template_name='blog/post_details.html'
    context_object_name='post'
    pk_url_kwarg='post_id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comment_form'] = CommentForm()
        return context

@login_required
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect('post_detail', post_id=post.id)
    
    return redirect('post_detail', post_id=post.id)

# FBV
# def post_list(request):
#     posts = Post.objects.filter(published=True).order_by('-created_at')
#     return render(request, 'blog/post_list.html', {'posts': posts})

# CBV
class PostListView(ListView):
    model=Post
    template_name='blog/post_list.html'
    context_object_name='posts'
    paginate_by=10 #Ten posts per page(Optional)

    def get_queryset(self):
        return Post.objects.filter(published=True).order_by('-created_at') 

# FBV
# def post_create(request):
#     if request.method=='POST':
#         form=PostForm(request.POST)
#         if form.is_valid():
#             post=form.save()
#             return redirect('post_detail',post_id=post.id)
#     else:
#         form=PostForm()

#         return render(request, 'blog/post_form.html',{'form':form})

#CBV
class PostCreateView(CreateView):
    model=Post
    form_class=PostForm
    template_name='blog/post_form.html'

    def get_success_url(self):
        return reverse_lazy('post_detail',kwargs={'post_id':self.object.id})

# FBV    
# def post_edit(request,post_id):
#     post=get_object_or_404(Post,id=post_id)

#     if request.method=='POST':
#         form=PostForm(request.POST,instance=post)
#         if form.is_valid():
#             form.save()
#             return redirect('post_detail',post_id=post.id)
#     else:
#         form=PostForm(instance=post)
#     return render(request,'blog/post_form.html',{'form':form, 'post':post})

#CBV
class PostUpdateView(UpdateView):
    model=Post
    form_class=PostForm
    template_name='blog/post_form.html'
    pk_url_kwarg='post_id'

    def get_success_url(self):
        return reverse_lazy('post_detail',kwargs={'post_id':self.object.id})
    
class PostDeleteView(DetailView):
    model=Post
    success_url=reverse_lazy('post_list')
    pk_url_kwarg='post_id'
    template_name='blog/post_confirm_delete.html'

def signup(request):
    if request.method=='POST':
        form=UserCreationForm(request.POST)
        if form.is_valid():
            user=form.save()
            login(request,user)
            return redirect('post_list')
    else:
        form=UserCreationForm()

    return render(request, 'registration/signup.html',{'form':form})