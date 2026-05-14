export const styles: string[] = ['/style-1.css', '/style-2.css', '/style-3.css'];

export function injectStyle(index: number): HTMLLinkElement {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = styles[index];
	document.head.appendChild(link);
	return link;
}

export function injectLink(containerSelector?: string): HTMLElement {
	const container = ((containerSelector ? document.querySelector(containerSelector) : null) as HTMLElement | null)
		|| (document.getElementById('style-links') as HTMLElement | null)
		|| (() => {
			const el = document.createElement('div') as HTMLElement;
			el.id = 'style-links';
			document.body.appendChild(el);
			return el;
		})();
	container.innerHTML = '';

	styles.forEach((href, i) => {
		const a = document.createElement('a');
		a.href = '#';
		a.textContent = href.split('/').pop() || href;
		a.style.cursor = 'pointer';
		a.style.marginRight = '8px'; //margines
		a.addEventListener('click', (e) => {
			e.preventDefault();
			injectStyle(i);
		});
		container.appendChild(a);
	});

	return container;
}

injectLink();

injectStyle(0);
