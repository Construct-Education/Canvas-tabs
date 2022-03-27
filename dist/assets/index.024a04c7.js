const updateConstrTabs = function (i) {
    if (!i.target.closest('.constr--accessible-tab')) return;
    i.preventDefault();
    const [n, s, ...c] = Array.from(
        this.querySelectorAll('[aria-hidden ="false"]')
      ),
      e = i.target.closest('.constr--accessible-tab'),
      t = this.querySelector(`${e.getAttribute('href')}`);
    if (e.getAttribute('aria-hidden') === 'false') return;
    if (n === e || !t || !e) {
      console.warn('Tab classes not set');
      return;
    }
    const o = () => {
      t.setAttribute('aria-hidden', 'false'),
        e.removeEventListener('transitionend', o);
    };
    n == null || n.setAttribute('aria-hidden', 'true'),
      s == null || s.setAttribute('aria-hidden', 'true'),
      e == null || e.setAttribute('aria-hidden', 'false'),
      e == null || e.addEventListener('transitionend', o),
      i.stopPropagation();
  },
  initConstrTabs = (i) => {
    i.forEach((s, c) => {
      const t = [...s.children].reduce(
          (l, f, d) => {
            let [a, ...u] = f.innerHTML.split('\u205E');
            (u = u.join('\u205E')),
              a.includes('a>') && (a = a.slice(a.indexOf('a>') + 2, -1));
            const p = new RegExp(/[a-z]/gi);
            let r = `
          ${a
            .split(' ')
            .slice(0, 4)
            .join('')
            .toLowerCase()
            .split('')
            .filter((m) => m.match(p))
            .join('')}${d}`;
            return (
              (r = r.replaceAll(' ', '')),
              (r = r.replaceAll(/(?:\r\n|\r|\n)/g, '')),
              (a = `<a tabindex="${c}${
                d + 1
              }"  href="#${r}" aria-controls="#${r}" id="${r}tab" class="constr--accessible-tab"  aria-hidden="${
                d === 0 ? 'false' : 'true'
              }" role="tab">${a.trim()}</a>`),
              (u = `<div tabindex="${c}${
                d + 1
              }" id = "${r}" aria-labelledby="${r}tab" class="constr--accessible-tabs--content" aria-hidden="${
                d === 0 ? 'false' : 'true'
              }" role="tabpanel">${u}</div>`),
              l.tabs.push(a),
              l.content.push(u),
              l
            );
          },
          { tabs: [], content: [] }
        ),
        o = `<div class="constr--accessible-tabs--container">${t.tabs.join(
          ''
        )}</div><div class ="constr--accessible-tabs--content--container">${t.content.join(
          ''
        )}</div>`;
      (s.innerHTML = ''),
        s.insertAdjacentHTML('afterbegin', o),
        s.addEventListener('click', updateConstrTabs.bind(s)),
        s.addEventListener('keyup', function (l, f) {
          l.keyCode === 13 && updateConstrTabs.bind(f, l);
        }),
        (s.className = 'constr--accessible-tabs');
    });
    const n = document.querySelectorAll('.init_constr--accessible-tabs');
    n.length > 0 && initConstrTabs(n);
  };
(function () {
  const i = document.querySelectorAll('.init_constr--accessible-tabs');
  i && initConstrTabs(i);
})();
