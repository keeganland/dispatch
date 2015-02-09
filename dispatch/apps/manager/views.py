from dispatch.apps.content.models import Article, Tag, Topic, Author
from django.template import RequestContext
from django.shortcuts import render_to_response, render, redirect
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from dispatch.apps.core.models import User, Person
from datetime import datetime
from .forms import ArticleForm, FeaturedImageForm

@staff_member_required
def section(request, section):
    return render_to_response(
        "admin/article/list.html",
        {
            'article_list' : Article.objects.filter(section__name__iexact=section,is_active=True).order_by('-published_at'),
            'section': section,
            'list_title': section,
        },
        RequestContext(request, {}),
    )

@staff_member_required
def articles(request):
    return render_to_response(
        "admin/article/list.html",
        {'article_list' : Article.objects.all()},
        RequestContext(request, {}),
    )

@staff_member_required
def article_add(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        featured_image_formset = FeaturedImageForm(request.POST)
        if form.is_valid():
            article = form.save()
            article.save_related(request)
        else:
            print featured_image_formset.errors
        if featured_image_formset.is_valid():
            featured_image = featured_image_formset.save()
            featured_image.resource = article
            article.featured_image = featured_image
            article.save(update_fields=['featured_image'])
            featured_image.save()
        else:
            print form.errors
        return redirect(article_edit, article.id)
    else:
        form = ArticleForm()
        featured_image_formset = FeaturedImageForm()

    #tags = ",".join(a.tags.values_list('name', flat=True))

    #images = a.images.all()
    #image_ids = ",".join([str(i) for i in a.images.values_list('id', flat=True)])

    user = User.objects.get(email=request.user)

    #a = Article()

    p = Person.objects.get(id=1)
    authors = [p]
    #a.authors.add(p)

    #print a

    author_str = p.full_name

    context = {
        #'article': a,
        'person': p,
        'form': form,
        'featured_form': featured_image_formset,
        'authors': authors,
        'authors_list': p.id,
        'author_string': author_str,
        'date': request.POST.get('published_at_date', False),
        'time': request.POST.get('published_at_time', False),
        #'tags': tags,
    }

    return render(request, 'admin/article/edit.html', context)

@staff_member_required
def article_edit(request, id):
    a = Article.objects.get(pk=id)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=a)
        if a.featured_image:
            a.featured_image.resource = a
            featured_image_formset = FeaturedImageForm(request.POST, instance=a.featured_image)
        else:
            featured_image_formset = FeaturedImageForm(request.POST)
        if featured_image_formset.has_changed() and featured_image_formset.is_valid():
            a.featured_image = featured_image_formset.save()
        else:
            print featured_image_formset.errors
        if form.is_valid():
            form.save()
            a.save_related(request)
        else:
            print form.errors
    else:
        form = ArticleForm(instance=a)
        featured_image_formset = FeaturedImageForm(instance=a.featured_image)

    tags = ",".join(a.tags.values_list('name', flat=True))

    images = a.images.all()
    image_ids = ",".join([str(i) for i in a.images.values_list('id', flat=True)])

    authors = a.authors.order_by('author__order')
    author_ids = ",".join([str(i) for i in authors.values_list('id', flat=True)])

    date = a.published_at.strftime("%Y-%m-%d")
    time = a.published_at.strftime("%H:%M")

    author_str = a.get_author_string()

    all_authors = Person.objects.all()

    context = {
        'article': a,
        'form': form,
        'featured_form': featured_image_formset,
        'tags': tags,
        'authors': authors,
        'authors_list': author_ids,
        'author_string': author_str,
        'all_authors': all_authors,
        'date': date,
        'time': time,
    }

    return render(request, 'admin/article/edit.html', context)

@staff_member_required
def article_delete(request, id):
    article = Article.objects.get(pk=id)
    section_slug = article.section.slug
    article.is_active = False
    article.save(update_fields=['is_active'])
    return redirect(section, section_slug)
