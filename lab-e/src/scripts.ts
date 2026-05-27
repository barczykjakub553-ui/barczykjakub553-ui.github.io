export const styles: string[] = ['/style-1.css', '/style-2.css', '/style-3.css'];

export function injectStyle(index: number): HTMLLinkElement {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = styles[index];
	document.head.appendChild(link);
	return link;
}

export function injectLink(): void {
	const containers: (HTMLElement | null)[] = [
		document.getElementById('link1'),
		document.getElementById('link2'),
		document.getElementById('link3')
	];

	containers.forEach((container, index) => {
		if (container) {
			container.textContent = styles[index].split('/').pop() || styles[index];
			container.style.cursor = 'pointer';
			container.style.marginRight = '8px';
			container.addEventListener('click', (e) => {
				e.preventDefault();
				injectStyle(index);
			});
		}
	})
}

injectLink();

injectStyle(0);
