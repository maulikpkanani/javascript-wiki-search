const form = document.querySelector('.searchForm');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
	// prevents the page form  is submitted
	event.preventDefault();

	// get the value of the input field
	const input = document.querySelector('.searchForm-input').value;
	// console.log(input);

	const searchQuery = input.trim();

	fetchResult(searchQuery);
}

function fetchResult(searchQuery) {
	const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

	// console.log(endpoint);
	fetch(endpoint)
		.then(res => res.json())
		.then(data => {
			const results = data.query.search;
			displayResults(results);
		})
		.catch(() => error());
}

function error() {
	const errorResults = document.querySelector('.searchResults');
	// console.log(errorResults);
	errorResults.innerHTML = '';
	console.log(errorResults);
	errorResults.insertAdjacentHTML(
		'afterbegin',
		`<div class="error">
		<h1>Cannot load the Search Result</h1>
    </div>`
	);
}

function displayResults(results) {
	const searchResults = document.querySelector('.searchResults');
	console.log(searchResults);

	searchResults.innerHTML = '';

	results.forEach(result => {
		console.log(result);

		const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
		console.log(url);
		searchResults.insertAdjacentHTML(
			'beforeend',
			`<div class="resultItem">
    <h3 class="resultItem-title" >
    <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
    </h3>
    <span class="resultItem-snippet">${result.snippet}</span>
    <br>
    <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
    </div>`
		);
	});
}
