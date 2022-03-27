import './style.scss';

const updateConstrTabs = function (this: HTMLDivElement, e: any) {
  if (!e.target.closest('.constr--accessible-tab')) return; // if no tab heading was clicked
  e.preventDefault();

  const [currentlyOpenTab, currentlyOpenContent, ..._] = Array.from(
    this.querySelectorAll('[aria-hidden ="false"]')
  );
  const targetTab: HTMLAnchorElement = e.target.closest(
    '.constr--accessible-tab'
  );
  const targetContent: HTMLDivElement | any = this.querySelector(
    `${targetTab.getAttribute('href')}`
  );

  if (targetTab.getAttribute('aria-hidden') === 'false') return;
  if (currentlyOpenTab === targetTab || !targetContent || !targetTab) {
    console.warn('Tab classes not set');
    return;
  } // guarding against variables not being assigned correctly

  const activateTargetContent = () => {
    // Animation (transition) delay for effect
    targetContent.setAttribute('aria-hidden', 'false');
    targetTab.removeEventListener('transitionend', activateTargetContent);
  };

  // Trigger hidden state for prev open tab and tab heading
  currentlyOpenTab?.setAttribute('aria-hidden', 'true');
  currentlyOpenContent?.setAttribute('aria-hidden', 'true');

  targetTab?.setAttribute('aria-hidden', 'false');
  targetTab?.addEventListener('transitionend', activateTargetContent);
  e.stopPropagation();
};

const initConstrTabs = (tabContainers: NodeList) => {
  tabContainers.forEach((container: any, n: number) => {
    const elements: Array<any> = [...container.children];

    const tabCode = elements.reduce(
      (code: any, el: any, i: number) => {
        let [heading, ...tabContent] = el.innerHTML.split('⁞');
        tabContent = tabContent.join('⁞');

        if (heading.includes('a>'))
          heading = heading.slice(heading.indexOf('a>') + 2, -1);

        //  The id is created from the tab number and first 3 words max of the tab title
        const idAllowed = new RegExp(/[a-z]/gi);
        let id = `
          ${heading
            .split(' ')
            .slice(0, 4)
            .join('')
            .toLowerCase()
            .split('')
            .filter((char: string) => char.match(idAllowed))
            .join('')}${i}`;

        id = id.replaceAll(' ', '');
        id = id.replaceAll(/(?:\r\n|\r|\n)/g, '');

        heading = `<a tabindex="${n}${
          i + 1
        }"  href="#${id}" aria-controls="#${id}" id="${id}tab" class="constr--accessible-tab"  aria-hidden="${
          i === 0 ? 'false' : 'true'
        }" role="tab">${heading.trim()}</a>`;

        tabContent = `<div tabindex="${n}${
          i + 1
        }" id = "${id}" aria-labelledby="${id}tab" class="constr--accessible-tabs--content" aria-hidden="${
          i === 0 ? 'false' : 'true'
        }" role="tabpanel">${tabContent}</div>`;

        code.tabs.push(heading);
        code.content.push(tabContent);
        return code;
      },
      { tabs: [], content: [] }
    );

    const html = `<div class="constr--accessible-tabs--container">${tabCode.tabs.join(
      ''
    )}</div><div class ="constr--accessible-tabs--content--container">${tabCode.content.join(
      ''
    )}</div>`;

    container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', html);

    container.addEventListener('click', updateConstrTabs.bind(container));

    container.addEventListener(
      'keyup',
      function (e: Event | any, container: any) {
        if (e.keyCode === 13) {
          updateConstrTabs.bind(container, e);
        } // Trigger only if Enter was pressed
      }
    );
    container.className = 'constr--accessible-tabs';
  });
  // Detect any sub tabs
  const tabsLeft = document.querySelectorAll('.init_constr--accessible-tabs');
  if (tabsLeft.length > 0) initConstrTabs(tabsLeft);
};

(function () {
  // Tabs
  const tabContainers = document.querySelectorAll(
    '.init_constr--accessible-tabs'
  );

  if (tabContainers) initConstrTabs(tabContainers);
})();
