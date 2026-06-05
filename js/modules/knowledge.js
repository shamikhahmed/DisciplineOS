const Knowledge = (() => {
  let searchQuery = '';
  let activeCategory = 'All';
  let bookmarks = JSON.parse(localStorage.getItem('dos_bookmarks') || '[]');

  const ALL_CATEGORIES = ['All', 'Dopamine', 'Smoking', 'Nicotine', 'Porn', 'Weed', 'Discipline', 'Focus', 'Sleep'];

  function render() {
    const el = document.getElementById('screen-knowledge');
    if (!el) return;

    const articles = filterArticles();

    el.innerHTML = `
    <div>
      <div class="knowledge-header">
        <div class="t-label t-dim">VAULT</div>
        <h2 class="t-title" style="margin-top:4px;">Knowledge Vault</h2>
        <p class="t-body t-muted" style="margin-top:4px;">${KNOWLEDGE_DB.length} evidence-based articles · 100% offline</p>
      </div>

      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" id="kb-search" placeholder="Search articles..." value="${searchQuery}">
        ${searchQuery ? `<button id="kb-clear" style="color:var(--text3);font-size:0.8rem;">✕</button>` : ''}
      </div>

      <div class="cat-filter">
        ${ALL_CATEGORIES.map((c) => `
          <div class="cat-chip${activeCategory === c ? ' active' : ''}" data-cat="${c}">${c}</div>
        `).join('')}
      </div>

      <div class="article-list">
        ${articles.length === 0 ? `
          <div style="padding:40px;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:12px;">📭</div>
            <div class="t-body t-muted">No articles found</div>
          </div>` :
          articles.map((a) => buildArticleCard(a)).join('')
        }
      </div>
      <div style="height:20px;"></div>
    </div>

    <div class="article-reader" id="article-reader">
      <div class="reader-header">
        <button class="btn btn-ghost btn-sm" id="reader-back">← Back</button>
      </div>
      <div class="reader-body" id="reader-body"></div>
    </div>`;

    attachHandlers();
  }

  function buildArticleCard(a) {
    const isBookmarked = bookmarks.includes(a.id);
    return `
    <div class="article-card" data-article-id="${a.id}">
      <div class="a-meta">
        <span class="a-cat">${a.category}</span>
        <span class="a-time" style="margin-left:auto;">${a.readTime} min read</span>
        <span style="font-size:0.85rem;margin-left:8px;color:${isBookmarked ? 'var(--gold)' : 'var(--text3)'};">
          ${isBookmarked ? '★' : '☆'}
        </span>
      </div>
      <div class="a-title">${a.title}</div>
      <div class="a-preview">${stripMarkdown(a.content)}</div>
      <div class="a-evidence">● ${a.evidenceLevel}</div>
    </div>`;
  }

  function filterArticles() {
    return (typeof KNOWLEDGE_DB !== 'undefined' ? KNOWLEDGE_DB : []).filter((a) => {
      const matchesCat = activeCategory === 'All' || a.category === activeCategory;
      const matchesSearch = !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }

  function stripMarkdown(text) {
    return text.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/\n/g, ' ').slice(0, 140) + '...';
  }

  function openArticle(id) {
    const article = (typeof KNOWLEDGE_DB !== 'undefined' ? KNOWLEDGE_DB : []).find((a) => a.id === id);
    if (!article) return;

    const reader = document.getElementById('article-reader');
    const body = document.getElementById('reader-body');
    if (!reader || !body) return;

    body.innerHTML = `
      <h2>${article.title}</h2>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:20px;flex-wrap:wrap;">
        <span class="badge badge-blue">${article.category}</span>
        <span class="t-caption">${article.readTime} min read</span>
        <span class="badge badge-green">${article.evidenceLevel}</span>
        <span class="t-caption" style="margin-left:auto;cursor:pointer;" id="bookmark-btn">
          ${bookmarks.includes(id) ? '★ Bookmarked' : '☆ Bookmark'}
        </span>
      </div>
      <div>${renderMarkdown(article.content)}</div>`;

    reader.classList.add('open');

    document.getElementById('bookmark-btn')?.addEventListener('click', () => {
      if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter((b) => b !== id);
      } else {
        bookmarks.push(id);
      }
      localStorage.setItem('dos_bookmarks', JSON.stringify(bookmarks));
      document.getElementById('bookmark-btn').textContent = bookmarks.includes(id) ? '★ Bookmarked' : '☆ Bookmark';
      App.showToast(bookmarks.includes(id) ? 'Article bookmarked' : 'Bookmark removed', 'info');
    });

    document.getElementById('reader-back')?.addEventListener('click', () => {
      reader.classList.remove('open');
    });
  }

  function renderMarkdown(text) {
    return text
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="font-size:1.1rem;margin:20px 0 8px;">$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--text);">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  function attachHandlers() {
    document.getElementById('kb-search')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });

    document.getElementById('kb-clear')?.addEventListener('click', () => {
      searchQuery = '';
      render();
    });

    document.querySelectorAll('.cat-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.cat;
        render();
      });
    });

    document.querySelectorAll('.article-card').forEach((card) => {
      card.addEventListener('click', () => openArticle(card.dataset.articleId));
    });
  }

  return { render };
})();
