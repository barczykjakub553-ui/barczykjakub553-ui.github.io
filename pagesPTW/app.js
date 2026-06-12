const QUIZ_SIZE = 30;

const state = {
    quiz: [],
    current: 0,
    answers: [],
    score: 0,
    mode: 'quiz30',
    selectedCategory: null
};

const $ = (id) => document.getElementById(id);

const screens = {
    start: $('start-screen'),
    quiz: $('quiz-screen'),
    result: $('result-screen'),
    review: $('review-screen')
};

function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initCategories() {
    let idx = 0;
    for (const range of CATEGORY_RANGES) {
        for (let i = 0; i < range.count; i++) {
            if (QUESTIONS[idx]) QUESTIONS[idx].cat = range.name;
            idx++;
        }
    }
}

function processPool(pool) {
    return pool.map(q => {
        const indexed = q.a.map((text, i) => ({ text, originalIndex: i }));
        const shuffled = shuffle(indexed);
        const newCorrect = shuffled.findIndex(o => o.originalIndex === q.correct);
        return {
            q: q.q,
            a: shuffled.map(o => o.text),
            correct: newCorrect,
            cat: q.cat || ''
        };
    });
}

function buildQuiz() {
    if (state.mode === 'quiz30') {
        return processPool(shuffle(QUESTIONS).slice(0, Math.min(QUIZ_SIZE, QUESTIONS.length)));
    }
    if (state.mode === 'all') {
        return processPool(shuffle(QUESTIONS));
    }
    if (state.mode === 'category') {
        const pool = QUESTIONS.filter(q => q.cat === state.selectedCategory);
        return processPool(shuffle(pool));
    }
    return [];
}

function startQuiz() {
    if (state.mode === 'category' && !state.selectedCategory) return;
    state.quiz = buildQuiz();
    state.current = 0;
    state.answers = [];
    state.score = 0;
    $('total-q').textContent = state.quiz.length;
    updateLiveScore();
    renderQuestion();
    showScreen('quiz');
}

function updateLiveScore() {
    const answered = state.answers.length;
    const el = $('live-score');
    if (answered === 0) {
        el.textContent = '—';
        el.className = 'live-score';
        return;
    }
    const percent = Math.round((state.score / answered) * 100);
    el.textContent = `${percent}%`;
    el.className = `live-score ${percent >= 50 ? 'ls-good' : 'ls-bad'}`;
}

function renderQuestion() {
    const q = state.quiz[state.current];
    const idx = state.current;
    const total = state.quiz.length;

    $('current-q').textContent = idx + 1;
    $('progress-fill').style.width = `${(idx / total) * 100}%`;

    const numEl = $('question-number');
    numEl.textContent = `Pytanie ${idx + 1}`;
    if (q.cat) {
        const tag = document.createElement('span');
        tag.className = 'cat-tag';
        tag.textContent = q.cat;
        numEl.appendChild(tag);
    }

    $('question-text').innerHTML = q.q;
    $('answer-feedback').textContent = '';
    $('answer-feedback').className = 'feedback';
    $('next-btn').disabled = true;
    $('next-btn').textContent = idx === total - 1 ? 'Zakończ test' : 'Następne';

    const answersDiv = $('answers');
    answersDiv.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.a.forEach((text, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer';
        btn.innerHTML = `<span class="marker">${letters[i]}</span><span class="text">${text}</span>`;
        btn.addEventListener('click', () => selectAnswer(i, btn));
        answersDiv.appendChild(btn);
    });
}

function selectAnswer(selected, btn) {
    const q = state.quiz[state.current];
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(b => {
        b.classList.add('disabled');
        b.style.pointerEvents = 'none';
    });

    const correct = q.correct;
    const isCorrect = selected === correct;

    buttons[correct].classList.add('correct');
    if (!isCorrect) btn.classList.add('wrong');

    state.answers.push({ selected, correct, isCorrect });
    if (isCorrect) state.score++;

    const fb = $('answer-feedback');
    fb.textContent = isCorrect ? '✓ Poprawnie!' : '✗ Niepoprawnie';
    fb.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;

    $('next-btn').disabled = false;
    $('progress-fill').style.width = `${((state.current + 1) / state.quiz.length) * 100}%`;

    updateLiveScore();
}

function nextQuestion() {
    if (state.current < state.quiz.length - 1) {
        state.current++;
        renderQuestion();
    } else {
        showResult();
    }
}

function quitQuiz() {
    const answered = state.answers.length;
    if (answered === 0) {
        if (confirm('Nie odpowiedziałeś jeszcze na żadne pytanie. Wyjść do menu głównego?')) {
            showScreen('start');
        }
        return;
    }
    const remaining = state.quiz.length - answered;
    const msg = remaining > 0
        ? `Zakończyć test?\n\nOdpowiedziałeś na ${answered} z ${state.quiz.length} pytań (pozostało ${remaining}).\n\nWynik zostanie obliczony na podstawie udzielonych odpowiedzi.`
        : 'Zakończyć test i zobaczyć wyniki?';
    if (confirm(msg)) {
        state.quiz = state.quiz.slice(0, answered);
        showResult();
    }
}

function showResult() {
    const answered = state.answers.length;
    const correct = state.score;
    const wrong = answered - correct;
    const percent = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    $('score-num').textContent = correct;
    document.querySelector('.score-total').textContent = `/${answered}`;
    $('score-percent').textContent = `${percent}%`;
    $('correct-count').textContent = correct;
    $('wrong-count').textContent = wrong;

    let emoji, title;
    if (percent === 100)    { emoji = '🏆'; title = 'Komplet punktów!'; }
    else if (percent >= 85) { emoji = '🎉'; title = 'Świetna robota!'; }
    else if (percent >= 70) { emoji = '👍'; title = 'Dobry wynik!'; }
    else if (percent >= 50) { emoji = '💪'; title = 'Jeszcze trochę pracy'; }
    else                    { emoji = '📚'; title = 'Czas wrócić do nauki'; }

    $('result-emoji').textContent = emoji;
    $('result-title').textContent = title;

    showScreen('result');
}

function showReview() {
    const list = $('review-list');
    list.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    state.quiz.forEach((q, i) => {
        const ans = state.answers[i];
        if (!ans) return;
        const item = document.createElement('div');
        item.className = `review-item${ans.isCorrect ? '' : ' wrong'}`;
        item.innerHTML = `
            <div class="review-q">${i + 1}. ${q.q}</div>
            ${!ans.isCorrect ? `
                <div class="review-a your"><strong>Twoja:</strong> ${letters[ans.selected]}. ${q.a[ans.selected]}</div>
            ` : ''}
            <div class="review-a correct"><strong>Poprawna:</strong> ${letters[ans.correct]}. ${q.a[ans.correct]}</div>
        `;
        list.appendChild(item);
    });

    showScreen('review');
}

// ── Strona startowa ──────────────────────────────────────────────

function setMode(mode) {
    state.mode = mode;
    state.selectedCategory = null;

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));

    const catPicker = $('category-picker');
    catPicker.classList.toggle('visible', mode === 'category');

    updateQuizSizeDisplay();
    updateStartBtn();
    updateModeHint();
}

function updateQuizSizeDisplay() {
    const el = $('quiz-size-display');
    if (state.mode === 'quiz30') el.textContent = Math.min(QUIZ_SIZE, QUESTIONS.length);
    else if (state.mode === 'all') el.textContent = QUESTIONS.length;
    else {
        if (state.selectedCategory) {
            el.textContent = QUESTIONS.filter(q => q.cat === state.selectedCategory).length;
        } else {
            el.textContent = '?';
        }
    }
}

function updateStartBtn() {
    const disabled = state.mode === 'category' && !state.selectedCategory;
    $('start-btn').disabled = disabled;
}

function updateModeHint() {
    const hint = $('mode-hint');
    if (state.mode === 'quiz30') {
        hint.textContent = 'Losowy zestaw 30 pytań. Każde pytanie ma jedną poprawną odpowiedź.';
    } else if (state.mode === 'all') {
        hint.textContent = `Wszystkie ${QUESTIONS.length} pytań w losowej kolejności.`;
    } else {
        if (state.selectedCategory) {
            const count = QUESTIONS.filter(q => q.cat === state.selectedCategory).length;
            hint.textContent = `Kategoria: ${state.selectedCategory} — ${count} pytań.`;
        } else {
            hint.textContent = 'Wybierz kategorię z listy powyżej, aby rozpocząć.';
        }
    }
}

function renderCategoryPicker() {
    const list = $('category-list');
    list.innerHTML = '';
    for (const range of CATEGORY_RANGES) {
        const btn = document.createElement('button');
        btn.className = 'category-item';
        btn.dataset.cat = range.name;
        btn.innerHTML = `<span class="cat-name">${range.name}</span><span class="cat-count">${range.count}</span>`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedCategory = range.name;
            updateQuizSizeDisplay();
            updateStartBtn();
            updateModeHint();
        });
        list.appendChild(btn);
    }
}

// ── Init ─────────────────────────────────────────────────────────

function init() {
    initCategories();

    $('total-questions').textContent = QUESTIONS.length;
    renderCategoryPicker();

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });

    $('start-btn').addEventListener('click', startQuiz);
    $('next-btn').addEventListener('click', nextQuestion);
    $('quit-btn').addEventListener('click', quitQuiz);

    $('retry-btn').addEventListener('click', startQuiz);
    $('retry-from-review').addEventListener('click', startQuiz);
    $('menu-btn').addEventListener('click', () => showScreen('start'));
    $('review-btn').addEventListener('click', showReview);
    $('back-to-result').addEventListener('click', () => showScreen('result'));
}

document.addEventListener('DOMContentLoaded', init);
